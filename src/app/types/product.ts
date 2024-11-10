export type Variation = {
  sku: string;
  stock: number;
  size: string;
  color: string;
  price: number;
  images: string[];
  sale: number;
  blobs: Blob[];
};

export type Product = {
  product_id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  variations: Variation[];
  specifications: { [key: string]: string };
  review_ids: string[];
  rating: number;
};
export type ProductCache = {
    id: string;
    name: string;
    slug: string;
    variants_num: number;
    category: string;
    price: number;
    sale: number;
    image1: string;
    image2: string;
};
export interface VariationImageBlob {
  variant: string;
  images: Blob[];
}
