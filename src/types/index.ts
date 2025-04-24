
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
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
}
