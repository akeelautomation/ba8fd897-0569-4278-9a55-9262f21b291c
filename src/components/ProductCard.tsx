
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-60 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {product.size && (
            <Badge variant="secondary">
              المقاس: {product.size}
            </Badge>
          )}
          {product.material && (
            <Badge variant="secondary">
              الخامة: {product.material}
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          <Button 
            size="sm" 
            onClick={() => addToCart(product)}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" /> إضافة للسلة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
