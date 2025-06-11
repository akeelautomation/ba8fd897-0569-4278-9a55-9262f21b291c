
export interface ProductColor {
  name: string;
  imageUrl: string;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  size?: string; // Optional size information for sheets
  material?: string; // Optional material information
  available?: boolean; // Availability status
  availabilityMessage?: string; // Custom availability message
  colors?: ProductColor[]; // Optional color variations
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string; // Track selected color for products with variations
}

export interface Customer {
  name: string;
  address: string;
  wilaya: string;
  phone: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  date: string;
  product_title?: string; // Added new fields to match the database
  product_price?: number;
  quantity?: number;
}
