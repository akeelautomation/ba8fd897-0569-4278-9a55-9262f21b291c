
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from "@/data/products";

const Header = () => {
  const { getTotalItems } = useCart();
  
  return (
    <header className="bg-pastel-white border-b border-pastel-medium sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-pastel-dark">مفروشات نواعم</Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link to="/" className="text-lg font-medium hover:text-pastel-primary transition-colors">الرئيسية</Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg font-medium hover:text-pastel-primary bg-transparent">
                  المنتجات
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/products?category=${encodeURIComponent(category)}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pastel-light hover:text-pastel-dark focus:bg-pastel-light focus:text-pastel-dark"
                      >
                        <div className="text-sm font-medium leading-none">{category}</div>
                      </Link>
                    ))}
                    <Link
                      to="/products"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pastel-primary hover:text-white focus:bg-pastel-primary focus:text-white bg-pastel-light"
                    >
                      <div className="text-sm font-medium leading-none">جميع المنتجات</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        <Link to="/cart">
          <Button variant="ghost" className="relative">
            <ShoppingCart className="h-6 w-6 text-pastel-charcoal" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
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
