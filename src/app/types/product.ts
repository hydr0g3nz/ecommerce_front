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

export interface VariationImageBlob {
  variant: string;
  images: Blob[];
}
