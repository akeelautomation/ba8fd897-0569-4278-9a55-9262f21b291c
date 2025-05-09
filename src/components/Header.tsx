
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const { getTotalItems } = useCart();
  
  return (
    <header className="bg-pastel-white border-b border-pastel-medium sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-pastel-dark">مفروشات نواعم</Link>
        </div>
        
        <nav className="hidden md:flex space-x-6 space-x-reverse">
          <Link to="/" className="text-lg font-medium hover:text-pastel-primary">الرئيسية</Link>
          <Link to="/products" className="text-lg font-medium hover:text-pastel-primary">المنتجات</Link>
          <Link to="/about" className="text-lg font-medium hover:text-pastel-primary">عن المتجر</Link>
          <Link to="/contact" className="text-lg font-medium hover:text-pastel-primary">اتصل بنا</Link>
        </nav>
        
        <Link to="/cart">
          <Button variant="ghost" className="relative">
            <ShoppingCart className="h-6 w-6 text-pastel-charcoal" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-pastel-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
