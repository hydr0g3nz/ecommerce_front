import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface Product {
  product_id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  variations: Variation[] | null;
  specifications: Specification;
  review_ids: null;
  rating: number | null;
}

export interface Variation {
  images: string[] | null;
  sale:number;
  sku: string;
  stock: number;
  size: string;
  color: string;
  price: number;
}

export interface Specification {
  type: string;
  color: string;
  dimensions: string;
  weight: string;
}

const ProductList = ({ products }: { products: Product[] | null }) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const getRandomImage = (currentProductId: string): string => {
    // if (!products) return "/placeholder-image.jpg";
    if (!products) return "/JUMPMAN+FLIGHT+HBR+TEE3.jpeg";
    const otherProducts = products.filter(
      (p) => p.product_id !== currentProductId
    );
    const randomProduct =
      otherProducts[Math.floor(Math.random() * otherProducts.length)];
    return "/" + randomProduct?.variations?.[0].images?.[0] || "/JUMPMAN+FLIGHT+HBR+TEE3.jpeg";
  };

  if (!products || products.length === 0) {
    return <div className="mt-12 text-center">No products available.</div>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products.map((product) => (
        <Link
          href={`/product/${product.product_id}`}
          className="w-full flex flex-col gap-4 lg:w-[22%]"
          key={product.product_id}
          onMouseEnter={() => setHoveredProduct(product.product_id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="relative w-full h-80">
            {product.variations?.[0].images?.[0] && (
              <Image
                src={"http://127.0.0.1:8080/api/v1/images/products/" + product.variations?.[0].images?.[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className={`absolute object-cover rounded-md z-10 transition-opacity duration-500 ${
                  hoveredProduct === product.product_id
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              />
            )}

            {(product.variations?.[0].images ? product.variations?.[0].images?.length > 1 : false) && (
              <Image
                src={"http://127.0.0.1:8080/api/v1/images/products/" +product.variations?.[0].images?.[1]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="absolute object-cover rounded-md z-0 transition-opacity duration-500 opacity-100"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">
              {product.variations !== null
                ? `$${product.variations[0]?.price?.toFixed(2)}`
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span>
              {product.rating !== null ? product.rating.toFixed(1) : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <Link href={`/${product.product_id}/edit`}>
              <button className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-secondary">
                Edit
              </button>
            </Link>
            <button className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-secondary">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
