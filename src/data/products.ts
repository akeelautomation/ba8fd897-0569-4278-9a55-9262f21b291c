import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    title: "طقم سرير قطني فاخر",
    description: "طقم سرير مصنوع من القطن المصري الفاخر بنسبة 100٪. يتضمن غطاء لحاف وملاءة سرير و2 غطاء وسادة. متوفر بألوان متعددة.",
    price: 8500,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "أطقم سرير",
    size: "200x180",
    material: "قطن مصري"
  },
  {
    id: "2",
    title: "غطاء سرير مطرز",
    description: "غطاء سرير مطرز بتصاميم عصرية. مصنوع من خامات عالية الجودة تدوم طويلاً.",
    price: 6500,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "أغطية سرير",
    size: "220x200",
    material: "قطن"
  },
  {
    id: "3",
    title: "ملاءة سرير ساتان",
    description: "ملاءة سرير من الساتان الفاخر. ناعمة الملمس ومريحة للنوم.",
    price: 4500,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "ملاءات",
    size: "200x180",
    material: "ساتان"
  },
  {
    id: "4",
    title: "أغطية وسائد مزخرفة",
    description: "مجموعة من 4 أغطية وسائد مزخرفة بتصاميم عصرية. مثالية لتزيين غرفة النوم.",
    price: 3500,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "أغطية وسائد",
    material: "قطن"
  },
  {
    id: "5",
    title: "طقم سرير أطفال",
    description: "طقم سرير للأطفال بتصاميم ملونة وجذابة. مصنوع من قطن طبيعي 100٪.",
    price: 5500,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "أطقم سرير",
    size: "160x120",
    material: "قطن"
  }
];

export const categories = [
  "الكل",
  "أطقم سرير",
  "أغطية سرير",
  "ملاءات",
  "أغطية وسائد"
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
