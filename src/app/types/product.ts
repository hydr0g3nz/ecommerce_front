export interface Variation {
    sku: string;
    stock: number;
    size: string;
    color: string;
    price: number;
  }
  
  export interface Product {
    product_id: string;
    name: string;
    description: string;
    brand: string;
    category: string;
    variations: Variation[];
    specifications: { [key: string]: string };
    review_ids: string[];
    rating: number;
    images: string[];
  }