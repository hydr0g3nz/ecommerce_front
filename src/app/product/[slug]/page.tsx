"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useProduct } from "@/hooks/useProduct";
import ProductImages from "@/components/ProductImages";
import Add from "@/components/Add";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, PenLine } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Product, Variation } from "@/types/product";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

// Types

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
            src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${product.variations?.[index]?.images?.[0]}`}
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
      <span className="text-lg font-bold text-black">เลือกไซส์</span>
      {/* <span className="text-sm text-gray-500 ml-2">คำแนะนำในการเลือกไซส์</span> */}
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

const PriceDisplay = ({ variant }: { variant: Variation }) => {
  if (!variant.sale) {
    variant.sale = 0;
  }
  const isSale = variant.sale != 0;
  const price = Math.floor(
    variant.price - variant.price * (variant.sale / 100)
  );
  const percent = Math.floor(variant.sale); // Since variant.sale is already a percentage
  return !isSale ? (
    <h2 className="font-medium text-2xl">฿{Math.floor(variant.price)}</h2>
  ) : (
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-bold">฿{price}</h2>
      <h3 className="text-lg text-gray-500 line-through">
        ฿{Math.floor(variant.price)}
      </h3>
      <h3 className="text-lg text-green-800 font-bold">ส่วนลด {percent}%</h3>
    </div>
  );
};

const Specifications = ({
  description,
  specs,
}: {
  description: string;
  specs: Record<string, string>;
}) => (
  <div className="space-y-2">
    <h2 className="text-sm">{description}</h2>
    {Object.entries(specs).map(([key, value], index) => (
      <div className="flex items-center gap-2" key={index}>
        <span className="text-lg leading-7">•</span>
        <div className="text-sm">
          <span className="font-medium">{key} : </span>
          <span>{value}</span>
        </div>
      </div>
    ))}
  </div>
);

const Divider = () => <div className="h-[2px] bg-gray-100" />;

// Main Component
const ProductDetailPage: React.FC = () => {
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState("");
  const id = usePathname().split("/")[2];
  const { product, loading, error, getProduct } = useProduct();
  const { role, authloading } = useAuth();
  const currentVariant = product.variations?.[variantIndex];

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
  
  const selectDisplayImages = () => {
    if (currentVariant?.images) {
      return currentVariant?.images;
    }
    return product.variations?.[0].images;
  };
  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (variantIndex === -1) return notFound();
  const cartItem = {
    name : product.name,
    product_id : product.product_id,
    brand : product.brand,
    category : product.category,
    variations : product.variations[variantIndex],
    image : selectDisplayImages()[0],
    quantity : 1,
  }
  return (
    <div className="min-h-max px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="flex flex-col grow lg:w-7/12 lg:sticky top-20">
        <ProductImages images={selectDisplayImages()} />
      </div>

      <div className="w-full lg:w-5/12 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold ">{product.name}</h1>
          {role === "admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={false}>
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/product/${product.product_id}/edit`}>
                  <DropdownMenuItem className="flex justify-between">
                    Edit
                    <PenLine />
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className="text-gray-500">{product.category}</p>

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
        <Add cartItem={cartItem}></Add>
        <Divider />
        <Specifications
          description={product.description}
          specs={product.specifications}
        />
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
