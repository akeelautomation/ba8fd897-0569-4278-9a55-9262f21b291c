
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
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
          <Button>العودة للصفحة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
