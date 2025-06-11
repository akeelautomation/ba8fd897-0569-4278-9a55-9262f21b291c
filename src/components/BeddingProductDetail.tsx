
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { Product, ProductColor } from "@/types";

interface BeddingProductDetailProps {
  product: Product;
}

const BeddingProductDetail: React.FC<BeddingProductDetailProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors ? product.colors[0] : null
  );
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  const handleOrderNow = () => {
    if (!product.available || !selectedColor) return;
    
    const productWithSelectedColor = {
      ...product,
      imageUrl: selectedColor.imageUrl,
      title: `${product.title} - ${selectedColor.name}`
    };
    
    addToCart(productWithSelectedColor);
    navigate("/checkout");
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-pastel-medium">
          <div className="relative">
            <img 
              src={selectedColor?.imageUrl || product.imageUrl} 
              alt={product.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="mb-6">
            <span className="text-xl font-bold text-pastel-dark block mb-2">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">وصف المنتج</h3>
            <p className="text-muted-foreground">
              {selectedColor?.description || product.description}
            </p>
          </div>

          {product.colors && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">اختر اللون</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${
                      selectedColor?.name === color.name
                        ? 'border-orange-500 shadow-lg'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <img
                      src={color.imageUrl}
                      alt={color.name}
                      className="w-full h-24 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-medium text-center">{color.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Button
            size="lg"
            onClick={handleOrderNow}
            disabled={!product.available || !selectedColor}
            className="w-full md:w-auto flex items-center justify-center gap-2 font-bold px-6 py-3 shadow-lg transition-all duration-200 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl transform hover:scale-105"
          >
            <ShoppingBag className="h-5 w-5" /> 
            اطلب الآن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeddingProductDetail;
