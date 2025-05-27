
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
    addToCart(product);
    navigate("/checkout");
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-pastel-medium">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-60 object-cover"
        />
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
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-pastel-dark">{formatPrice(product.price)}</span>
          <Button 
            size="sm" 
            onClick={handleOrderNow}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4" /> اطلب الآن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
