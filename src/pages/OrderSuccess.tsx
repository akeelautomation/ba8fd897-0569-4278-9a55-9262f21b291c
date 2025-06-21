import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import ReactPixel from 'react-facebook-pixel';
import { useCart } from "@/contexts/CartContext";

const OrderSuccess = () => {
  const location = useLocation();
  const { clearCart } = useCart();
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    ReactPixel.track('Purchase', {
      value: totalPrice,
      currency: 'DZD',
    });
    
    clearCart();
  }, [totalPrice, clearCart]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">تم تأكيد طلبك بنجاح!</h1>
        
        <p className="text-muted-foreground mb-6">
          شكراً لطلبك من متجرنا. سنتواصل معك قريباً لتأكيد موعد التوصيل.
        </p>
        
        <div className="mb-8">
          <p className="font-medium">طريقة الدفع: الدفع عند التوصيل</p>
        </div>
        
        <Link to="/">
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">العودة للصفحة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
