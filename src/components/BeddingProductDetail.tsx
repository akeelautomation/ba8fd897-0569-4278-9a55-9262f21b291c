
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Phone, MapPin } from "lucide-react";
import { Product, ProductColor } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wilayas } from "@/data/wilayas";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BeddingProductDetailProps {
  product: Product;
}

const BeddingProductDetail: React.FC<BeddingProductDetailProps> = ({ product }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors ? product.colors[0] : null
  );
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  const handleOrderSubmit = async () => {
    if (!product.available || !selectedColor || !customerName || !customerPhone || !selectedWilaya || !customerAddress) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع البيانات المطلوبة واختيار اللون",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const shippingPrice = 600;
      const totalPrice = product.price + shippingPrice;

      // Insert order into Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_wilaya: selectedWilaya,
          customer_address: customerAddress,
          total_price: totalPrice,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order item with selected color information
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData.id,
          product_id: product.id,
          product_title: `${product.title} - ${selectedColor.name}`,
          product_price: product.price,
          quantity: 1,
          selected_color: selectedColor.name
        });

      if (itemError) throw itemError;

      console.log('Bedding order submitted successfully:', {
        order_id: orderData.id,
        product_id: product.id,
        product_title: product.title,
        selected_color: selectedColor.name,
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
            {/* Main Product Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pastel-medium">
              <div className="relative">
                <img 
                  src={selectedColor?.imageUrl || product.imageUrl} 
                  alt={`${product.title} - ${selectedColor?.name || ''}`} 
                  className="w-full h-[600px] object-cover transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Color Selection */}
            {product.colors && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-pastel-medium">
                <h3 className="text-xl font-semibold mb-4 text-pastel-dark">اختر اللون المفضل</h3>
                <div className="grid grid-cols-3 gap-4">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-lg border-2 p-2 transition-all duration-200 ${
                        selectedColor?.name === color.name
                          ? 'border-orange-500 shadow-lg bg-orange-50 scale-105'
                          : 'border-pastel-medium hover:border-pastel-primary hover:shadow-md hover:scale-102'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <img
                        src={color.imageUrl}
                        alt={color.name}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <p className={`text-sm font-medium text-center ${
                        selectedColor?.name === color.name ? 'text-orange-600' : 'text-pastel-dark'
                      }`}>
                        {color.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-pastel-medium">
              <h1 className="text-3xl font-bold mb-4 text-pastel-dark">{product.title}</h1>
              {selectedColor && (
                <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-orange-600 font-semibold">اللون المختار: {selectedColor.name}</p>
                </div>
              )}
              <p className="text-pastel-charcoal mb-4 leading-relaxed">
                {selectedColor?.description || product.description}
              </p>
              {product.size && (
                <p className="text-pastel-charcoal mb-2">المقاس: {product.size}</p>
              )}
              {product.material && (
                <p className="text-pastel-charcoal">الخامة: {product.material}</p>
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
                    {formatPrice(product.price)}
                  </div>
                  <p className="text-pastel-charcoal">غطاء سرير مع غطاء وسادة</p>
                  {selectedColor && (
                    <p className="text-sm text-orange-600 mt-1">اللون: {selectedColor.name}</p>
                  )}
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
                      <span className="text-orange-500">{formatPrice(product.price)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span className="text-pastel-dark">ثمن التوصيل</span>
                      <span className="text-pastel-dark">{formatPrice(shippingPrice)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-orange-500 border-t border-pastel-medium pt-2">
                      <span>المجموع</span>
                      <span>{formatPrice(product.price + shippingPrice)}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleOrderSubmit}
                    disabled={!product.available || !selectedColor || isSubmitting || !customerName || !customerPhone || !selectedWilaya || !customerAddress}
                    className="w-full flex items-center justify-center gap-2 font-bold px-6 py-4 text-lg shadow-lg transition-all duration-200 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl transform hover:scale-105"
                  >
                    <ShoppingBag className="h-5 w-5" /> 
                    {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب'}
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

export default BeddingProductDetail;
