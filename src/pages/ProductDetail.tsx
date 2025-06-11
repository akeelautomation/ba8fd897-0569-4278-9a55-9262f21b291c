
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import BeddingProductDetail from "@/components/BeddingProductDetail";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <Button onClick={() => navigate("/products")}>العودة للمنتجات</Button>
      </div>
    );
  }

  // Use special component for bedding products with color selection
  if (product.category === "غطاء سرير مع غطاء وسادة" && product.colors) {
    return <BeddingProductDetail product={product} />;
  }
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  const handleOrderNow = () => {
    if (!product.available) return;
    addToCart(product);
    navigate("/checkout");
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-pastel-medium">
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className={`w-full h-auto object-cover ${!product.available ? 'opacity-60' : ''}`}
            />
            {!product.available && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white font-bold text-xl text-center px-4">
                  {product.availabilityMessage}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="mb-6">
            {product.available ? (
              <span className="text-xl font-bold text-pastel-dark block mb-2">
                {formatPrice(product.price)}
              </span>
            ) : (
              <p className="text-red-600 font-semibold">{product.availabilityMessage}</p>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">وصف المنتج</h3>
            <p className="text-muted-foreground">
              {product.description}
            </p>
          </div>
          
          <Button
            size="lg"
            onClick={handleOrderNow}
            disabled={!product.available}
            className={`w-full md:w-auto flex items-center justify-center gap-2 font-bold px-6 py-3 shadow-lg transition-all duration-200 ${
              product.available 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl transform hover:scale-105' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="h-5 w-5" /> 
            {product.available ? 'اطلب الآن' : 'غير متوفر حالياً'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
