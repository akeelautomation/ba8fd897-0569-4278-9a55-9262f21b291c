
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  const handleOrderNow = () => {
    if (!product.available) return;
    addToCart(product);
    navigate("/checkout");
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-pastel-medium">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className={`w-full h-60 object-cover ${!product.available ? 'opacity-60' : ''}`}
          />
          {!product.available && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-bold text-lg text-center px-4">
                {product.availabilityMessage}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-pastel-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.size && (
            <Badge variant="outline" className="bg-pastel-light text-foreground">
              المقاس: {product.size}
            </Badge>
          )}
          {product.material && (
            <Badge variant="outline" className="bg-pastel-light text-foreground">
              الخامة: {product.material}
            </Badge>
          )}
          {!product.available && (
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
              غير متوفر
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-pastel-dark">{formatPrice(product.price)}</span>
          <Button 
            size="sm" 
            onClick={handleOrderNow}
            disabled={!product.available}
            className={`flex items-center gap-2 font-bold px-4 py-2 shadow-lg transition-all duration-200 ${
              product.available 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl transform hover:scale-105' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="h-4 w-4" /> 
            {product.available ? 'اطلب الآن' : 'غير متوفر'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
