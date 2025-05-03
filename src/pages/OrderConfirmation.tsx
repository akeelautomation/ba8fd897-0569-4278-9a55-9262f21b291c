
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { cart, customer, clearCart, getTotalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  useEffect(() => {
    if (!customer || cart.length === 0) {
      navigate("/");
    }
  }, [customer, cart, navigate]);
  
  const handleConfirmOrder = async () => {
    if (!customer || cart.length === 0) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      console.log("Starting order creation process...");
      console.log("Customer data:", customer);
      console.log("Cart items:", cart.length);
      
      // First, create an order object with all needed data
      const orderData = {
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_wilaya: customer.wilaya,
        customer_address: customer.address,
        total_price: getTotalPrice()
      };
      
      console.log("Submitting order with data:", orderData);
      
      // Try to insert the order data
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
      
      console.log("Inserting order items:", orderItems.length);
      
      // Insert order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        console.error("Order items insertion failed:", itemsError);
        
        // Attempt to clean up the orphaned order
        console.log("Attempting to clean up orphaned order:", createdOrder.id);
        await supabase
          .from('orders')
          .delete()
          .eq('id', createdOrder.id);
          
        throw new Error(`Failed to add order items: ${itemsError.message}`);
      }
      
      console.log("Order process completed successfully");
      
      // Clear the cart and redirect to success page
      clearCart();
      toast({
        title: "تم تأكيد الطلب",
        description: "تم تأكيد طلبك بنجاح، سيتم التواصل معك قريباً",
      });
      navigate("/order-success");
    } catch (error: any) {
      console.error("Order submission failed:", error);
      setSubmitError(error.message || "حدث خطأ غير معروف");
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إكمال طلبك، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!customer) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">مراجعة الطلب</h1>
      
      {submitError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>فشل تأكيد الطلب</AlertTitle>
          <AlertDescription>
            حدث خطأ أثناء محاولة تأكيد طلبك. يرجى المحاولة مرة أخرى لاحقاً.
            {/* {submitError} */}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">معلومات التوصيل</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">معلومات العميل</h3>
            <p><span className="font-medium">الاسم:</span> {customer.name}</p>
            <p><span className="font-medium">رقم الهاتف:</span> {customer.phone}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">عنوان التوصيل</h3>
            <p><span className="font-medium">الولاية:</span> {customer.wilaya}</p>
            <p><span className="font-medium">العنوان:</span> {customer.address}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">طريقة الدفع</h2>
        
        <div className="flex items-center p-4 bg-sand-light rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
          <span className="font-medium">الدفع عند التوصيل</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-right py-3">المنتج</th>
                <th className="text-center py-3">السعر</th>
                <th className="text-center py-3">الكمية</th>
                <th className="text-left py-3">المجموع</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cart.map((item) => (
                <tr key={item.product.id}>
                  <td className="py-4">
                    <div className="flex items-center">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.title} 
                        className="w-16 h-16 object-cover rounded ml-4"
                      />
                      <span className="font-medium">{item.product.title}</span>
                    </div>
                  </td>
                  <td className="text-center py-4">{formatPrice(item.product.price)}</td>
                  <td className="text-center py-4">{item.quantity}</td>
                  <td className="text-left py-4 font-medium">{formatPrice(item.product.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>المجموع الفرعي</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>التوصيل</span>
            <span>مجاني</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>المجموع الكلي</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Link to="/checkout">
          <Button variant="outline">تعديل الطلب</Button>
        </Link>
        
        <Button 
          onClick={handleConfirmOrder} 
          disabled={isSubmitting}
          className="min-w-[180px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري المعالجة...
            </>
          ) : (
            "تأكيد وإنهاء الطلب"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
