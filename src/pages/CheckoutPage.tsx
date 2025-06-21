import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wilayas } from "@/data/wilayas";
import { z } from "zod";
import { Customer } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, setCustomer, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const shippingPrice = 600;
  
  const [formData, setFormData] = useState<Customer>({
    name: "",
    address: "",
    wilaya: "",
    phone: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleWilayaChange = (value: string) => {
    setFormData((prev) => ({ ...prev, wilaya: value }));
    
    // Clear error when selecting
    if (errors.wilaya) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.wilaya;
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const schema = z.object({
      name: z.string().min(3, { message: "الاسم مطلوب ويجب أن يكون أكثر من 3 أحرف" }),
      address: z.string().min(5, { message: "العنوان مطلوب ويجب أن يكون أكثر من 5 أحرف" }),
      wilaya: z.string().min(1, { message: "الرجاء اختيار الولاية" }),
      phone: z.string().regex(/^0[567][0-9]{8}$/, { message: "رقم هاتف غير صالح، يجب أن يبدأ ب 05 أو 06 أو 07 ويتكون من 10 أرقام" })
    });
    
    try {
      schema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setCustomer(formData);
      
      try {
        console.log("Starting order creation process...");
        console.log("Cart items:", cart);
        console.log("Customer data:", formData);
        
        // For orders with multiple items, we'll store first product info in the orders table
        const firstItem = cart[0];
        
        // Create an order object with all needed data including first product info
        const orderData = {
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_wilaya: formData.wilaya,
          customer_address: formData.address,
          total_price: getTotalPrice() + shippingPrice,
          status: "pending",
          // Add the first product information to the order
          product_title: firstItem.product.title,
          product_price: firstItem.product.price,
          quantity: firstItem.quantity
        };
        
        console.log("Submitting order with data:", orderData);
        
        // Insert the order data
        const { data: createdOrder, error: orderError } = await supabase
          .from('orders')
          .insert(orderData)
          .select()
          .single();
        
        // Handle order creation error
        if (orderError) {
          console.error("Order creation error:", orderError);
          throw new Error(`Failed to create order: ${orderError.message}`);
        }
        
        if (!createdOrder || !createdOrder.id) {
          throw new Error("No order data returned");
        }
        
        console.log("Order created successfully with ID:", createdOrder.id);
        
        // Prepare order items with the order ID
        const orderItems = cart.map(item => ({
          order_id: createdOrder.id,
          product_id: item.product.id,
          product_title: item.product.title,
          product_price: item.product.price,
          quantity: item.quantity
        }));
        
        console.log("Inserting order items:", orderItems);
        
        // Insert order items
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
        
        if (itemsError) {
          console.error("Order items insertion failed:", itemsError);
          
          // Attempt to clean up the orphaned order
          await supabase
            .from('orders')
            .delete()
            .eq('id', createdOrder.id);
            
          throw new Error(`Failed to add order items: ${itemsError.message}`);
        }
        
        console.log("Order process completed successfully");
        
        const totalPrice = getTotalPrice() + shippingPrice;

        // Clear cart and show success toast
        toast({
          title: "تم تأكيد الطلب",
          description: "تم تأكيد طلبك بنجاح، سيتم التواصل معك قريباً",
        });
        
        // Navigate to success page with total price
        navigate("/order-success", { state: { totalPrice } });
      } catch (error: any) {
        console.error("Order submission failed:", error);
        toast({
          title: "حدث خطأ",
          description: "لم نتمكن من إكمال طلبك، يرجى المحاولة مرة أخرى",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">إتمام الطلب</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">معلومات التوصيل</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">الاسم الكامل*</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">رقم الهاتف*</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05xxxxxxxx"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="wilaya">الولاية*</Label>
                    <Select 
                      value={formData.wilaya} 
                      onValueChange={handleWilayaChange}
                    >
                      <SelectTrigger className={errors.wilaya ? "border-red-500" : ""}>
                        <SelectValue placeholder="اختر الولاية" />
                      </SelectTrigger>
                      <SelectContent>
                        {wilayas.map((wilaya) => (
                          <SelectItem key={wilaya} value={wilaya}>
                            {wilaya}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.wilaya && <p className="text-red-500 text-sm mt-1">{errors.wilaya}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="address">العنوان التفصيلي*</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    "تأكيد الطلب"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>
            
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between pb-4 border-b">
                  <div className="flex items-center">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.title} 
                      className="w-12 h-12 object-cover rounded ml-4"
                    />
                    <div>
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        الكمية: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              
              <div className="flex justify-between pb-4 border-b">
                <span>المجموع الفرعي</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              
              <div className="flex justify-between pb-4 border-b">
                <span>التوصيل</span>
                <span>{formatPrice(shippingPrice)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg">
                <span>المجموع الكلي</span>
                <span>{formatPrice(getTotalPrice() + shippingPrice)}</span>
              </div>
              
              <div className="bg-sand-light p-4 rounded-md mt-4">
                <p className="font-medium mb-2">طريقة الدفع:</p>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span>الدفع عند التوصيل</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
