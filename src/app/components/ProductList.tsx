"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product, Variation } from "@/types/product";

const ProductPrice = ({ variant }: { variant: Variation }) => {
  const isSale = variant.sale != 0;
  const price = Math.floor(
    variant.price - variant.price * (variant.sale / 100)
  );
  const percent = Math.floor(variant.sale); // Since variant.sale is already a percentage

  return !isSale ? (
    <h2 className="font-bold text-md mt-2">฿{Math.floor(variant.price)}</h2>
  ) : (
    <>
      <div className="flex items-center gap-4 mt-2">
        <h2 className="text-md font-bold">฿{price}</h2>
        <h3 className="text-md text-gray-500 line-through">
          ฿{Math.floor(variant.price)}
        </h3>
      </div>
      <h3 className="text-md text-green-800 font-bold">ส่วนลด {percent}%</h3>
    </>
  );
};
const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-md">{product.name}</p>
      <p className="text-md text-gray-500">{product.category}</p>
      <p className="text-md text-gray-500">{product.variations.length} สี</p>
      <ProductPrice variant={product.variations?.[0]} />
    </div>
  );
};
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
    return (
      "/" + randomProduct?.variations?.[0].images?.[0] ||
      "/JUMPMAN+FLIGHT+HBR+TEE3.jpeg"
    );
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
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${product.variations?.[0].images?.[0]}`}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className={`absolute object-cover  z-10 transition-opacity duration-500 ${
                  hoveredProduct === product.product_id
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              />
            )}

            {(product.variations?.[0].images
              ? product.variations?.[0].images?.length > 1
              : false) && (
              <Image
                src={
`                  ${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${product.variations?.[0].images?.[1]}`
                }
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="absolute object-cover  z-0 transition-opacity duration-500 opacity-100"
              />
            )}
          </div>
          <div className="flex items-center">
            <ProductDetail product={product} />
          </div>
          {/* <div className="flex justify-between">
            <Link href={`/${product.product_id}/edit`}>
              <button className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-secondary">
                Edit
              </button>
            </Link>
            <button className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-secondary">
              Add to Cart
            </button>
          </div> */}
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
