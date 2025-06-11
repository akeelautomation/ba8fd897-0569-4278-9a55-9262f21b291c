
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProductsByCategory } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Phone, MapPin } from "lucide-react";

const BeddingLandingPage = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const beddingProducts = getProductsByCategory("غطاء سرير مع غطاء وسادة");
  const beddingProduct = beddingProducts[0]; // Get the consolidated product
  const shippingPrice = 600;
  
  const selectedColorData = beddingProduct?.colors?.find(color => color.name === selectedColor);
  const subtotal = beddingProduct ? beddingProduct.price * quantity : 0;
  const total = subtotal + shippingPrice;
  
  const handleOrderNow = () => {
    if (!beddingProduct || !selectedColorData || !customerName || !customerPhone || !wilaya) {
      alert("يرجى ملء جميع البيانات المطلوبة");
      return;
    }
    
    const productWithSelectedColor = {
      ...beddingProduct,
      imageUrl: selectedColorData.imageUrl,
      title: `${beddingProduct.title} - ${selectedColorData.name}`
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productWithSelectedColor);
    }
    navigate("/checkout");
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Showcase */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
              يرجى ادخال معلوماتك فقط لنا كنت معيدا بشراء مكرر
            </h1>
            
            {selectedColorData && (
              <div className="mb-6">
                <img 
                  src={selectedColorData.imageUrl} 
                  alt={selectedColorData.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{beddingProduct?.title} - {selectedColorData.name}</h3>
                <p className="text-muted-foreground text-sm">{selectedColorData.description}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="color">اختر اللون</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر اللون" />
                  </SelectTrigger>
                  <SelectContent>
                    {beddingProduct?.colors?.map((color) => (
                      <SelectItem key={color.name} value={color.name}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="quantity">الكمية</Label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min="1"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2">
                  <span>الاسم و اللقب</span>
                </Label>
                <Input 
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="ادخل اسمك الكامل"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>رقم الهاتف</span>
                </Label>
                <Input 
                  id="phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="ادخل رقم هاتفك"
                />
              </div>
              
              <div>
                <Label htmlFor="wilaya" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>الولاية</span>
                </Label>
                <Input 
                  id="wilaya"
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  placeholder="اختر الولاية"
                />
              </div>
              
              <div>
                <Label htmlFor="commune">البلدية</Label>
                <Input 
                  id="commune"
                  value={commune}
                  onChange={(e) => setCommune(e.target.value)}
                  placeholder="اختر البلدية"
                />
              </div>
              
              {/* Price Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>ثمن المنتج:</span>
                  <span>{subtotal.toLocaleString()} دج</span>
                </div>
                <div className="flex justify-between">
                  <span>ثمن التوصيل:</span>
                  <span>{shippingPrice.toLocaleString()} دج</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>المجموع:</span>
                  <span>{total.toLocaleString()} دج</span>
                </div>
              </div>
              
              <Button 
                onClick={handleOrderNow}
                disabled={!selectedColor || !customerName || !customerPhone || !wilaya}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 text-lg"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                تأكيد الطلب
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeddingLandingPage;
