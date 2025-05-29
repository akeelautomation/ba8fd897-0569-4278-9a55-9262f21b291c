
import React from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
  // Take first 4 products for featured section
  const featuredProducts = products.slice(0, 4);
  
  return (
    <section className="py-16 bg-pastel-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">منتجاتنا المميزة</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            اكتشف تشكيلتنا المميزة من المفروشات العصرية عالية الجودة المناسبة لمنزلك
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              عرض جميع المنتجات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
