
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Phone, MapPin } from "lucide-react";
import { Product, ProductColor } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BeddingProductDetailProps {
  product: Product;
}

const BeddingProductDetail: React.FC<BeddingProductDetailProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors ? product.colors[0] : null
  );
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  const handleOrderNow = () => {
    if (!product.available || !selectedColor) return;
    
    const productWithSelectedColor = {
      ...product,
      imageUrl: selectedColor.imageUrl,
      title: `${product.title} - ${selectedColor.name}`
    };
    
    addToCart(productWithSelectedColor);
    navigate("/checkout");
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
          {/* Product Images Section */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={selectedColor?.imageUrl || product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
            
            {/* Color Selection */}
            {product.colors && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-4 text-white">اختر اللون</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${
                        selectedColor?.name === color.name
                          ? 'border-orange-500 shadow-lg'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <img
                        src={color.imageUrl}
                        alt={color.name}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <p className="text-sm font-medium text-center text-white">{color.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Info */}
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <h1 className="text-2xl font-bold mb-4 text-white">{product.title}</h1>
              <p className="text-gray-300 mb-4">
                {selectedColor?.description || product.description}
              </p>
              {product.size && (
                <p className="text-gray-400 mb-2">المقاس: {product.size}</p>
              )}
              {product.material && (
                <p className="text-gray-400">الخامة: {product.material}</p>
              )}
            </div>
          </div>

          {/* Order Form Section */}
          <div className="bg-gray-800 rounded-lg p-6 h-fit sticky top-4">
            <div className="text-white space-y-6">
              <div className="text-center border-b border-gray-700 pb-4">
                <h2 className="text-xl font-bold mb-2">يرجى إدخال معلوماتك فقط إذا كنت</h2>
                <p className="text-orange-400 font-semibold">مهتماً بالشراء شكراً</p>
              </div>

              <div className="text-center py-4">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {formatPrice(product.price)}
                </div>
                <p className="text-gray-400">غطاء سرير مع غطاء وسادة</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">الإسم واللقب</Label>
                  <div className="relative">
                    <Input 
                      id="name"
                      className="bg-gray-700 border-gray-600 text-white pl-10"
                      placeholder="أدخل اسمك الكامل"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white mb-2 block">رقم الهاتف</Label>
                  <div className="relative">
                    <Input 
                      id="phone"
                      className="bg-gray-700 border-gray-600 text-white pl-10"
                      placeholder="أدخل رقم هاتفك"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="wilaya" className="text-white mb-2 block">الولاية</Label>
                  <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2">
                    <option value="">اختر الولاية</option>
                    <option value="الجزائر">الجزائر</option>
                    <option value="وهران">وهران</option>
                    <option value="قسنطينة">قسنطينة</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="commune" className="text-white mb-2 block">البلدية</Label>
                  <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2">
                    <option value="">اختر البلدية</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="address" className="text-white mb-2 block">العنوان</Label>
                  <div className="relative">
                    <Input 
                      id="address"
                      className="bg-gray-700 border-gray-600 text-white pl-10"
                      placeholder="أدخل عنوانك"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>ثمن المنتج</span>
                    <span className="text-orange-400">{formatPrice(product.price)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>ثمن التوصيل</span>
                    <span>مجاني</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-orange-400 border-t border-gray-700 pt-2">
                    <span>المجموع</span>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleOrderNow}
                  disabled={!product.available || !selectedColor}
                  className="w-full flex items-center justify-center gap-2 font-bold px-6 py-4 text-lg shadow-lg transition-all duration-200 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl transform hover:scale-105"
                >
                  <ShoppingBag className="h-5 w-5" /> 
                  تأكيد الطلب
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeddingProductDetail;
