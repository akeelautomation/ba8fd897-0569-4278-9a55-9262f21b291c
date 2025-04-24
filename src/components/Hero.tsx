
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-sand-dark py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brown-dark">
              مفروشات عصرية لمنزل أنيق
            </h1>
            <p className="text-lg mb-8 max-w-lg">
              اكتشفي تشكيلتنا الراقية من أطقم السرير والمفروشات المنزلية المصنوعة من أجود أنواع الأقمشة
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-brown hover:bg-brown-dark text-white">
                  <Sheet className="ml-2 h-5 w-5" />
                  تسوق الآن
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-brown text-brown hover:bg-brown hover:text-white">
                  اقرأ المزيد
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
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
