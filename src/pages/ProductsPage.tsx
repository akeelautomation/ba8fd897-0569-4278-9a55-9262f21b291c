
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { getProductsByCategory, categories } from "@/data/products";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || categories[0]);
  
  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);
  
  const filteredProducts = getProductsByCategory(activeCategory);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">منتجاتنا</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اكتشف تشكيلتنا الواسعة من المفروشات العصرية عالية الجودة المناسبة لمنزلك
        </p>
      </div>
      
      <CategoryFilter 
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
