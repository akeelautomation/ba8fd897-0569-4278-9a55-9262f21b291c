
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-cream py-16">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-warm-rust mb-4">404</h1>
        <p className="text-2xl font-semibold mb-6 text-warm-brown">الصفحة غير موجودة</p>
        <p className="text-warm-darkgray mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-warm-terracotta hover:bg-warm-rust text-white">العودة إلى الصفحة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
