
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-pastel-light py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pastel-dark">
              مفروشات عصرية لمنزل أنيق
            </h1>
            <p className="text-lg mb-8 max-w-lg">
              اكتشفي تشكيلتنا الراقية من أطقم السرير والمفروشات المنزلية المصنوعة من أجود أنواع الأقمشة
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  <Sheet className="ml-2 h-5 w-5" />
                  تسوق الآن
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white hover:border-transparent font-bold transition-all duration-200 transform hover:scale-105">
                  اقرأ المزيد
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/4cbec7f4-bc5c-4103-862d-67b463624187.png"
              alt="مفروشات منزلية راقية" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
