import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Phone, MapPin } from "lucide-react";
import BeddingProductDetail from "@/components/BeddingProductDetail";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wilayas } from "@/data/wilayas";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import ReactPixel from 'react-facebook-pixel';
import { Product } from "@/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Enhanced debugging logs
  console.log('ProductDetail - Component mounted');
  console.log('ProductDetail - Requested product ID:', id);
  console.log('ProductDetail - ID type:', typeof id);
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Ensure ID is a string and try to find the product
  const productId = id?.toString() || "";
  console.log('ProductDetail - Normalized product ID:', productId);
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
  });
  
  console.log('ProductDetail - Found product:', product);
  console.log('ProductDetail - Product available?', product?.available);
  
  // Force product check immediately after render
  useEffect(() => {
    if (productId === "34") {
      console.log("Critical product ID 34 requested - Verifying data availability");
      const product34 = getProductById("34");
      console.log("Product 34 data:", product34);
      
      if (!product34) {
        console.error("Product 34 not found in data source but should exist");
      }
    }
  }, [productId]);
  
  useEffect(() => {
    if (product) {
      ReactPixel.track('ViewContent', {
        content_name: product.title,
        content_ids: [product.id],
        content_type: 'product',
        value: product.price,
        currency: 'DZD',
      });
    }
  }, [product]);
  
  if (!product) {
    console.log('ProductDetail - Product not found for ID:', productId);
    console.log('ProductDetail - Available product IDs in data:', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34']);
    
    // Special handling for ID 34 if somehow product is not found
    if (productId === "34") {
      console.warn("Product 34 URL accessed but product not found - attempting emergency redirect");
      return (
        <div className="min-h-screen bg-pastel-beige flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-pastel-dark">جاري تحميل المنتج...</h2>
            <p className="mb-4 text-pastel-charcoal">يرجى الانتظار قليلاً</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-pastel-primary hover:bg-pastel-accent mb-4"
            >
              إعادة تحميل الصفحة
            </Button>
            <Button 
              onClick={() => navigate("/products")} 
              className="bg-pastel-primary hover:bg-pastel-accent ml-2"
            >
              العودة للمنتجات
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-pastel-beige flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-pastel-dark">المنتج غير موجود</h2>
          <p className="mb-4 text-pastel-charcoal">معرف المنتج المطلوب: {productId}</p>
          <p className="mb-4 text-pastel-charcoal text-sm">نوع المعرف: {typeof id}</p>
          <Button onClick={() => navigate("/products")} className="bg-pastel-primary hover:bg-pastel-accent">
            العودة للمنتجات
          </Button>
        </div>
      </div>
    );
  }

  // Use special component for bedding products with color selection
  if (product.category === "غطاء سرير مع غطاء وسادة" && product.colors) {
    console.log('ProductDetail - Rendering BeddingProductDetail for product:', product.id);
    return <BeddingProductDetail product={product} />;
  }
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  const handleOrderSubmit = async () => {
    if (!product.available || !customerName || !customerPhone || !selectedWilaya || !customerAddress) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const shippingPrice = 600;
      const totalPrice = product.price + shippingPrice;

      // Insert order into Supabase with product information
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_wilaya: selectedWilaya,
          customer_address: customerAddress,
          total_price: totalPrice,
          product_title: product.title,
          product_price: product.price,
          quantity: 1,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order item with complete product information
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData.id,
          product_id: product.id,
          product_title: product.title,
          product_price: product.price,
          quantity: 1,
          selected_color: '' // Empty string for non-bedding products
        });

      if (itemError) throw itemError;

      console.log('Order submitted successfully:', {
        order_id: orderData.id,
        product_id: product.id,
        product_title: product.title,
        customer_name: customerName
      });

      toast({
        title: "تم تأكيد الطلب بنجاح",
        description: "سيتم التواصل معك قريباً لتأكيد التوصيل",
      });

      // Reset form
      setCustomerName("");
      setCustomerPhone("");
      setSelectedWilaya("");
      setCustomerAddress("");

    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const shippingPrice = 600;
  
  return (
    <div className="min-h-screen bg-pastel-beige">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pastel-medium">
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className={`w-full h-[600px] object-cover ${!product.available ? 'opacity-60' : ''}`}
                />
                {!product.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-white font-bold text-xl text-center px-4">
                      {product.availabilityMessage}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-pastel-medium">
              <h1 className="text-3xl font-bold mb-4 text-pastel-dark">{product.title}</h1>
              <p className="text-pastel-charcoal mb-4 leading-relaxed whitespace-pre-line">{product.description}</p>
              {product.size && (
                <p className="text-pastel-charcoal mb-2">المقاس: {product.size}</p>
              )}
            </div>
          </div>

          {/* Order Form Section */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-pastel-medium sticky top-4">
              <div className="space-y-6">
                <div className="text-center border-b border-pastel-medium pb-4">
                  <h2 className="text-xl font-bold mb-2 text-pastel-dark">يرجى إدخال معلوماتك فقط إذا كنت</h2>
                  <p className="text-orange-500 font-semibold">مهتماً بالشراء شكراً</p>
                </div>

                <div className="text-center py-4">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    {product.available ? formatPrice(product.price) : product.availabilityMessage}
                  </div>
                  <p className="text-pastel-charcoal">{product.category}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-pastel-dark mb-2 block font-medium">الإسم واللقب</Label>
                    <div className="relative">
                      <Input 
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-pastel-light border-pastel-medium text-pastel-dark pl-10 focus:border-pastel-primary"
                        placeholder="أدخل اسمك الكامل"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 bg-pastel-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-pastel-dark mb-2 block font-medium">رقم الهاتف</Label>
                    <div className="relative">
                      <Input 
                        id="phone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="bg-pastel-light border-pastel-medium text-pastel-dark pl-10 focus:border-pastel-primary"
                        placeholder="أدخل رقم هاتفك"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pastel-charcoal" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="wilaya" className="text-pastel-dark mb-2 block font-medium">الولاية</Label>
                    <Select value={selectedWilaya} onValueChange={setSelectedWilaya}>
                      <SelectTrigger className="bg-pastel-light border-pastel-medium text-pastel-dark focus:border-pastel-primary">
                        <SelectValue placeholder="اختر الولاية" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-pastel-medium max-h-[200px] overflow-y-auto">
                        {wilayas.map((wilaya) => (
                          <SelectItem key={wilaya} value={wilaya} className="text-pastel-dark hover:bg-pastel-light">
                            {wilaya}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-pastel-dark mb-2 block font-medium">العنوان</Label>
                    <div className="relative">
                      <Input 
                        id="address"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="bg-pastel-light border-pastel-medium text-pastel-dark pl-10 focus:border-pastel-primary"
                        placeholder="أدخل عنوانك"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pastel-charcoal" />
                    </div>
                  </div>

                  <div className="border-t border-pastel-medium pt-4">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span className="text-pastel-dark">ثمن المنتج</span>
                      <span className="text-orange-500">
                        {product.available ? formatPrice(product.price) : "غير متوفر"}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span className="text-pastel-dark">ثمن التوصيل</span>
                      <span className="text-pastel-dark">{formatPrice(shippingPrice)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-orange-500 border-t border-pastel-medium pt-2">
                      <span>المجموع</span>
                      <span>{product.available ? formatPrice(product.price + shippingPrice) : "غير متوفر"}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleOrderSubmit}
                    disabled={!product.available || isSubmitting || !customerName || !customerPhone || !selectedWilaya || !customerAddress}
                    className={`w-full flex items-center justify-center gap-2 font-bold px-6 py-4 text-lg shadow-lg transition-all duration-200 ${
                      product.available 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl transform hover:scale-105' 
                        : 'bg-pastel-medium text-pastel-charcoal cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="h-5 w-5" /> 
                    {isSubmitting ? 'جاري الإرسال...' : (product.available ? 'تأكيد الطلب' : 'غير متوفر حالياً')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
