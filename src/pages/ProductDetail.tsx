
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

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
  
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} دج`;
  };
  
  const handleOrderNow = () => {
    addToCart(product);
    navigate("/checkout");
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="mb-6">
            <span className="text-xl font-bold text-primary block mb-2">
              {formatPrice(product.price)}
            </span>
            <p className="text-muted-foreground">التوصيل مجاني لجميع مناطق الجزائر</p>
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
            className="w-full md:w-auto flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-5 w-5" /> اطلب الآن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
