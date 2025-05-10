
import React from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className={`${
            activeCategory === category ? "bg-pastel-primary text-white" : "text-pastel-dark border-pastel-primary"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
