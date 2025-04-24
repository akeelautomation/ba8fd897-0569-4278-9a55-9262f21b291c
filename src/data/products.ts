
import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    title: "أريكة مودرن",
    description: "أريكة مريحة بتصميم عصري مناسبة لغرف المعيشة. مصنوعة من أقمشة عالية الجودة ومتوفرة بألوان متعددة.",
    price: 45000,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    category: "أرائك"
  },
  {
    id: "2",
    title: "طاولة طعام خشبية",
    description: "طاولة طعام خشبية فاخرة بتصميم أنيق. مناسبة للعائلات ومصنوعة من خشب الزان عالي الجودة.",
    price: 38000,
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80",
    category: "طاولات"
  },
  {
    id: "3",
    title: "سرير مزدوج",
    description: "سرير مزدوج مريح بتصميم عصري. إطار خشبي متين مع قاعدة داعمة لراحة مثالية.",
    price: 52000,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    category: "غرف نوم"
  },
  {
    id: "4",
    title: "خزانة ملابس",
    description: "خزانة ملابس واسعة بتصميم أنيق. توفر مساحة تخزين كبيرة مع أدراج وأرفف متعددة.",
    price: 65000,
    imageUrl: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    category: "خزائن"
  },
  {
    id: "5",
    title: "كرسي استرخاء",
    description: "كرسي استرخاء مريح مثالي للقراءة أو مشاهدة التلفاز. تصميم أنيق مع دعم لأسفل الظهر.",
    price: 28000,
    imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "كراسي"
  },
  {
    id: "6",
    title: "طاولة قهوة",
    description: "طاولة قهوة أنيقة لغرفة المعيشة. تصميم عصري مع سطح زجاجي وقاعدة خشبية.",
    price: 18500,
    imageUrl: "https://images.unsplash.com/photo-1599300057525-ebc186c322e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "طاولات"
  },
  {
    id: "7",
    title: "سجادة فاخرة",
    description: "سجادة فاخرة بتصميم شرقي تقليدي. مصنوعة من خامات عالية الجودة ومتوفرة بمقاسات مختلفة.",
    price: 32000,
    imageUrl: "https://images.unsplash.com/photo-1575414003553-d493c5853aaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    category: "سجاد"
  },
  {
    id: "8",
    title: "مكتبة كتب",
    description: "مكتبة كتب أنيقة مع أرفف متعددة. تصميم عصري يناسب المساحات المختلفة في المنزل.",
    price: 42000,
    imageUrl: "https://images.unsplash.com/photo-1588279102080-83005c714d47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "رفوف"
  }
];

export const categories = [
  "الكل",
  "أرائك",
  "طاولات",
  "غرف نوم",
  "خزائن",
  "كراسي",
  "سجاد",
  "رفوف"
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
