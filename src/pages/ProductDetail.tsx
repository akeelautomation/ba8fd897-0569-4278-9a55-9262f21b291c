
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Phone, MapPin } from "lucide-react";
import BeddingProductDetail from "@/components/BeddingProductDetail";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { wilayas } from "@/data/wilayas";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <div className="min-h-screen bg-pastel-beige flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-pastel-dark">المنتج غير موجود</h2>
          <Button onClick={() => navigate("/products")} className="bg-pastel-primary hover:bg-pastel-accent">
            العودة للمنتجات
          </Button>
        </div>
      </div>
    );
  }

  // Use special component for bedding products with color selection
  if (product.category === "غطاء سرير مع غطاء وسادة" && product.colors) {
    return <BeddingProductDetail product={product} />;
  }
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  const handleOrderNow = () => {
    if (!product.available) return;
    addToCart(product);
    navigate("/checkout");
  };
  
  const shippingPrice = 600;
  
  return (
    <div className="min-h-screen bg-pastel-beige">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Product Images Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pastel-medium">
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className={`w-full h-80 lg:h-96 object-cover ${!product.available ? 'opacity-60' : ''}`}
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
              <p className="text-pastel-charcoal mb-4 leading-relaxed">{product.description}</p>
              {product.size && (
                <p className="text-pastel-charcoal mb-2">المقاس: {product.size}</p>
              )}
              {product.material && (
                <p className="text-pastel-charcoal">الخامة: {product.material}</p>
              )}
            </div>
          </div>

          {/* Order Form Section */}
          <div className="lg:col-span-2">
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
                  <p className="text-pastel-charcoal">Pack De Musculation</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-pastel-dark mb-2 block font-medium">الإسم واللقب</Label>
                    <div className="relative">
                      <Input 
                        id="name"
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
                        className="bg-pastel-light border-pastel-medium text-pastel-dark pl-10 focus:border-pastel-primary"
                        placeholder="أدخل رقم هاتفك"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pastel-charcoal" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="wilaya" className="text-pastel-dark mb-2 block font-medium">الولاية</Label>
                    <Select>
                      <SelectTrigger className="bg-pastel-light border-pastel-medium text-pastel-dark focus:border-pastel-primary">
                        <SelectValue placeholder="اختر الولاية" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-pastel-medium">
                        {wilayas.map((wilaya) => (
                          <SelectItem key={wilaya} value={wilaya} className="text-pastel-dark hover:bg-pastel-light">
                            {wilaya}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="commune" className="text-pastel-dark mb-2 block font-medium">البلدية</Label>
                    <Select>
                      <SelectTrigger className="bg-pastel-light border-pastel-medium text-pastel-dark focus:border-pastel-primary">
                        <SelectValue placeholder="اختر البلدية" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-pastel-medium">
                        <SelectItem value="placeholder" className="text-pastel-charcoal">اختر الولاية أولاً</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-pastel-dark mb-2 block font-medium">العنوان</Label>
                    <div className="relative">
                      <Input 
                        id="address"
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
                    onClick={handleOrderNow}
                    disabled={!product.available}
                    className={`w-full flex items-center justify-center gap-2 font-bold px-6 py-4 text-lg shadow-lg transition-all duration-200 ${
                      product.available 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl transform hover:scale-105' 
                        : 'bg-pastel-medium text-pastel-charcoal cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="h-5 w-5" /> 
                    {product.available ? 'تأكيد الطلب' : 'غير متوفر حالياً'}
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
