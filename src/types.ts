export interface Product {
  id: string;
  name: string;
  category: 'paleniska' | 'grille' | 'drewutnie' | 'meble';
  price: number;
  description: string;
  features: string[];
  image: string;
  materials: { name: string; priceModifier: number }[];
  sizes: { name: string; priceModifier: number }[];
}

export interface CartItem {
  id: string; // unique item id including options
  product: Product;
  quantity: number;
  selectedMaterial: string;
  selectedSize: string;
  totalPrice: number;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  items: {
    name: string;
    material: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  date: string;
  status: 'Nowe' | 'W trakcie analizy' | 'Oferta wysłana';
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: 'paleniska' | 'grille' | 'drewutnie' | 'meble';
}

export interface Feature {
  iconName: string;
  title: string;
  description: string;
}
