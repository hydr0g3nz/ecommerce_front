"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useProduct } from "@/hooks/useProduct";
import ProductImages from "@/components/ProductImages";
import Add from "@/components/Add";

// Types
type Variant = {
  color: string;
  size: string;
  price: number;
  stock: number;
  images: string[];
};

type Product = {
  _id?: string;
  name: string;
  description: string;
  variations: Variant[];
  specifications: Record<string, string>;
};

// Helper Components
const ColorSelector = ({
  colors,
  product,
  variantIndex,
  onVariantSelect,
}: {
  colors: string[];
  product: Product;
  variantIndex: number;
  onVariantSelect: (index: number) => void;
}) => (
  <div className="flex gap-4">
    {colors?.map((color, i) => {
      const index = product.variations.findIndex((p) => p.color === color);
      return (
        <div
          className={`rounded-md relative cursor-pointer w-2/12 h-auto ${
            variantIndex === index
              ? "border border-black "
              : "hover:border-black hover:border"
          }`}
          key={i}
          onClick={() => onVariantSelect(index)}
        >
          <Image
            src={`http://127.0.0.1:8080/api/v1/images/products/${product.variations?.[index]?.images?.[0]}`}
            alt={`${product.name} in ${color}`}
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "auto" }}
            className="rounded-md"
          />
        </div>
      );
    })}
  </div>
);

const SizeSelector = ({
  product,
  variantIndex,
  selectedSize,
  onSizeSelect,
}: {
  product: Product;
  variantIndex: number;
  selectedSize: string;
  onSizeSelect: (size: string, index: number) => void;
}) => (
  <>
    <div className="flex items-center mb-2">
      <span className="text-sm text-gray-700">เลือกไซส์</span>
      <span className="text-sm text-gray-500 ml-2">คำแนะนำในการเลือกไซส์</span>
    </div>
    <div className="flex gap-2">
      {product.variations
        ?.filter((v) => v.color === product.variations[variantIndex].color)
        .map((variant) => {
          const isAvailable = variant.stock > 0;
          return (
            <button
              key={variant.size}
              onClick={() => {
                const newIndex = product.variations.findIndex(
                  (p) =>
                    p.size === variant.size &&
                    p.color === product.variations[variantIndex].color
                );
                onSizeSelect(variant.size, newIndex);
              }}
              className={`
                h-10 w-10 flex items-center justify-center
                border rounded bg-white w-fit p-3 text-lg
                ${
                  selectedSize === variant.size
                    ? "border-black"
                    : "border-gray-300 hover:border-black"
                }
                ${
                  isAvailable
                    ? "hover:border-blue-500"
                    : "opacity-50 cursor-not-allowed"
                }
              `}
              disabled={!isAvailable}
            >
              {variant.size}
            </button>
          );
        })}
    </div>
  </>
);

const PriceDisplay = ({ variant }: { variant: Variant }) =>
  variant.price === variant.price ? (
    <h2 className="font-medium text-2xl">${variant.price}</h2>
  ) : (
    <div className="flex items-center gap-4">
      <h3 className="text-xl text-gray-500 line-through">${variant.price}</h3>
      <h2 className="font-medium text-2xl">${variant.price}</h2>
    </div>
  );

const Specifications = ({ specs }: { specs: Record<string, string> }) => (
  <>
    {Object.entries(specs).map(([key, value], index) => (
      <div className="text-sm" key={index}>
        <h4 className="font-medium mb-4">{key}</h4>
        <p>{value}</p>
      </div>
    ))}
  </>
);

const Divider = () => <div className="h-[2px] bg-gray-100" />;

// Main Component
const ProductDetailPage: React.FC = () => {
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState("");
  const id = usePathname().split("/")[2];
  const { product, loading, error, getProduct } = useProduct();

  const colors = [...new Set(product.variations?.map((v) => v.color))];
  const sizes = [...new Set(product.variations?.map((v) => v.size))];

  useEffect(() => {
    getProduct(id);
    setVariantIndex(product.variations ? 0 : -1);
  }, []);

  const handleSizeSelect = (size: string, index: number) => {
    setSelectedSize(size);
    setVariantIndex(index);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (variantIndex === -1) return notFound();

  const currentVariant = product.variations?.[variantIndex];

  return (
    <div className="min-h-max px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="flex flex-col grow lg:w-7/12 lg:sticky top-20">
        <ProductImages images={currentVariant?.images} />
      </div>

      <div className="w-full lg:w-5/12 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>

        <Divider />
        <PriceDisplay variant={currentVariant} />
        <Divider />

        <ColorSelector
          colors={colors}
          product={product}
          variantIndex={variantIndex}
          onVariantSelect={setVariantIndex}
        />

        <SizeSelector
          product={product}
          variantIndex={variantIndex}
          selectedSize={selectedSize}
          onSizeSelect={handleSizeSelect}
        />

        <Divider />
        <Specifications specs={product.specifications} />
        <Divider />

        <h1 className="text-2xl">User Reviews</h1>
        {/* <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
