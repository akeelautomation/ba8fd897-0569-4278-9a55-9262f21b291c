
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  
  const shippingPrice = 600;
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold mt-4 mb-2">سلة التسوق فارغة</h2>
          <p className="text-muted-foreground mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق</p>
          <Link to="/products">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">تصفح المنتجات</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b">
              <div className="col-span-6">المنتج</div>
              <div className="col-span-2 text-center">السعر</div>
              <div className="col-span-2 text-center">الكمية</div>
              <div className="col-span-2 text-center">المجموع</div>
            </div>
            
            <div className="space-y-6 mt-4">
              {cart.map((item) => (
                <div key={item.product.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b">
                  <div className="col-span-12 md:col-span-6 flex items-center space-x-4 space-x-reverse">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.title} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.product.title}</h3>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 flex items-center mt-2 text-sm"
                      >
                        <Trash className="h-4 w-4 ml-1" /> إزالة
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-2 text-center">
                    <span className="md:hidden font-medium">السعر: </span>
                    {formatPrice(item.product.price)}
                  </div>
                  
                  <div className="col-span-4 md:col-span-2 flex justify-center items-center">
                    <div className="flex items-center border rounded-md">
                      <button 
                        className="px-2 py-1 border-l"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 border-r"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-2 text-center font-bold">
                    <span className="md:hidden font-medium">المجموع: </span>
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">ملخص الطلب</h3>
            
            <div className="space-y-4">
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
              
              <Link to="/checkout" className="block mt-6">
                <Button className="w-full flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  متابعة الشراء <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
