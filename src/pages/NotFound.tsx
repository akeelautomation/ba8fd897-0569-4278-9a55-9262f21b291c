
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pastel-beige py-16">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-pastel-primary mb-4">404</h1>
        <p className="text-2xl font-semibold mb-6 text-pastel-dark">الصفحة غير موجودة</p>
        <p className="text-pastel-charcoal mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">العودة إلى الصفحة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
