
import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    title: "ستارة بيضاء مطرزة بأوراق وردية",
    description: "ستارة جميلة من القماش الأبيض مزينة بتطريز أوراق وردية ناعمة. مثالية لإضافة لمسة أنثوية راقية لأي غرفة.",
    price: 4500,
    imageUrl: "/lovable-uploads/714e2004-5421-42eb-87c0-95d751b1a1af.png",
    category: "حجاب نافذة/ريدو",
    material: "قطن مطرز"
  },
  {
    id: "2",
    title: "ستارة بيضاء بتطريز أوراق خضراء",
    description: "ستارة أنيقة باللون الأبيض مع تطريز جميل بأوراق خضراء. تتميز بالحلقات المعدنية للتعليق السهل.",
    price: 4200,
    imageUrl: "/lovable-uploads/273bf218-4af0-4b6a-80c5-060f1d2566f8.png",
    category: "حجاب نافذة/ريدو",
    material: "قطن مطرز"
  },
  {
    id: "3",
    title: "ستارة بيضاء بنقوش هندسية",
    description: "ستارة فاخرة باللون الأبيض مزينة بنقوش هندسية راقية ومربعات صغيرة. تضفي طابعاً عصرياً على المكان.",
    price: 5000,
    imageUrl: "/lovable-uploads/bf4b51c6-7b17-4d10-9379-87b9e40ff9e5.png",
    category: "حجاب نافذة/ريدو",
    material: "قطن منقوش"
  },
  {
    id: "4",
    title: "ستارة زرقاء بنقوش ذهبية",
    description: "ستارة أنيقة باللون الأزرق الداكن مزينة بنقوش ذهبية فاخرة تشبه الرخام. إضافة مثالية للغرف الكلاسيكية.",
    price: 6500,
    imageUrl: "/lovable-uploads/d2d145ad-aed1-4a29-a375-c2a0aefdb971.png",
    category: "حجاب نافذة/ريدو",
    material: "ساتان منقوش"
  },
  {
    id: "5",
    title: "ستارة بنفسجية بنقوش مموجة",
    description: "ستارة جميلة باللون البنفسجي مع نقوش مموجة أنيقة. تتميز بملمسها الناعم وألوانها الهادئة المريحة للعين.",
    price: 5500,
    imageUrl: "/lovable-uploads/f88fb07a-d2ce-4f73-95f5-0b67c339a310.png",
    category: "حجاب نافذة/ريدو",
    material: "ساتان منقوش"
  }
];

export const categories = [
  "الكل",
  "حجاب نافذة/ريدو"
];

export function getProductsByCategory(category: string): Product[] {
  if (category === "الكل") {
    return products;
  }
  
  return products.filter(product => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}
