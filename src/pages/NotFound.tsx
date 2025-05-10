
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
          <Button size="lg" className="bg-pastel-primary hover:bg-pastel-taupe text-white">العودة إلى الصفحة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
