
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-sand-dark py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brown-dark">
              أثاث فاخر لمنزل عصري
            </h1>
            <p className="text-lg mb-8 max-w-lg">
              نقدم لكم أفضل تشكيلة من المفروشات العصرية عالية الجودة لتعطي منزلك لمسة من الأناقة والراحة
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-brown hover:bg-brown-dark text-white">
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
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="أثاث منزلي فاخر" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
