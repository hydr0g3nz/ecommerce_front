"use client";
import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical, PenLine } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";
import { Product, Variation } from "@/types/product";
import { CartItem } from "@/features/cart/cartSlice";


interface ColorSelectorProps {
  colors: string[];
  product: Product;
  variantIndex: number;
  onVariantSelect: (index: number) => void;
}

interface SizeSelectorProps {
  product: Product;
  variantIndex: number;
  selectedSize: string;
  onSizeSelect: (size: string, index: number) => void;
}

// Helper Components
const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  product,
  variantIndex,
  onVariantSelect,
}) => {
  if (!colors.length || !product.variations.length) return null;

  return (
    <div className="flex gap-4">
      {colors.map((color, i) => {
        const index = product.variations.findIndex((p) => p.color === color);
        if (index === -1) return null;

        const images = product.variations[index]?.images;
        if (!images?.length) return null;

        return (
          <div
            className={`rounded-md relative cursor-pointer w-2/12 h-auto ${variantIndex === index
                ? "border border-black"
                : "hover:border-black hover:border"
              }`}
            key={`${color}-${i}`}
            onClick={() => onVariantSelect(index)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${images[0]}`}
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
};

const SizeSelector: React.FC<SizeSelectorProps> = ({
  product,
  variantIndex,
  selectedSize,
  onSizeSelect,
}) => {
  const currentVariant = product.variations[variantIndex];
  if (!currentVariant) return null;

  const availableSizes = product.variations
    .filter((v) => v.color === currentVariant.color)
    .map((v) => v.size);

  return (
    <>
      <div className="flex items-center mb-2">
        <span className="text-lg font-bold text-black">เลือกไซส์</span>
      </div>
      <div className="flex gap-2">
        {availableSizes.map((size) => {
          const variant = product.variations.find(
            (v) => v.size === size && v.color === currentVariant.color
          );
          if (!variant) return null;

          const isAvailable = variant.stock > 0;
          return (
            <button
              key={size}
              onClick={() => {
                const newIndex = product.variations.findIndex(
                  (p) => p.size === size && p.color === currentVariant.color
                );
                onSizeSelect(size, newIndex);
              }}
              className={`
                h-10 w-10 flex items-center justify-center
                border rounded bg-white w-fit p-3 text-lg
                ${selectedSize === size
                  ? "border-black"
                  : "border-gray-300 hover:border-black"
                }
                ${isAvailable
                  ? "hover:border-blue-500"
                  : "opacity-50 cursor-not-allowed"
                }
              `}
              disabled={!isAvailable}
            >
              {size}
            </button>
          );
        })}
      </div>
    </>
  );
};

const PriceDisplay: React.FC<{ variant: Variation }> = ({ variant }) => {
  const salePercent = variant.sale || 0;
  const isSale = salePercent !== 0;
  const price = Math.floor(variant.price - variant.price * (salePercent / 100));
  const percent = Math.floor(salePercent);

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

const Divider: React.FC = () => <div className="h-[2px] bg-gray-100" />;

const ProductDetailPage: React.FC = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")?.[2];
  const { product, loading, error, getProduct } = useProduct();
  const { role } = useAuth();

  // Combined state management for variant and size
  const [selectedVariant, setSelectedVariant] = useState<{
    index: number;
    size: string;
  }>({
    index: 0,
    size: "",
  });

  // Single useEffect for initial data fetching
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) {
        notFound();
        return;
      }

      try {
        await getProduct(id);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductData();
  }, []);

  // Set initial variant and size once product is loaded
  useEffect(() => {
    if (product?.variations?.length > 0) {
      setSelectedVariant({
        index: 0,
        size: product.variations[0].size,
      });
    }
  }, [product?.product_id]); // Only run when product ID changes

  // Early returns for loading and error states
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-medium">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <div className="text-lg font-medium">Error loading product</div>
          <div className="text-sm">{error}</div>
        </div>
      </div>
    );
  }

  if (!product || selectedVariant.index === -1) {
    return notFound();
  }

  const currentVariant = product.variations[selectedVariant.index];
  if (!currentVariant) {
    return notFound();
  }

  const colors = Array.from(new Set(product.variations.map((v) => v.color)));
  const displayImages = currentVariant?.images || product.variations[0]?.images || [];

  const cartItem: CartItem = {
    name: product.name,
    product_id: product.product_id,
    brand: product.brand,
    category: product.category,
    variations: currentVariant,
    image: displayImages[0],
    quantity: 1,
  };

  // Handlers for variant and size selection
  const handleVariantSelect = (index: number) => {
    const newVariant = product.variations[index];
    setSelectedVariant({
      index,
      size: newVariant.size,
    });
  };

  const handleSizeSelect = (size: string, index: number) => {
    setSelectedVariant({
      index,
      size,
    });
  };

  return (
    <div className="min-h-max px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="flex flex-col grow lg:w-7/12 lg:sticky top-20">
        <ProductImages images={displayImages} />
      </div>

      <div className="w-full lg:w-5/12 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {role === "admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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
          variantIndex={selectedVariant.index}
          onVariantSelect={handleVariantSelect}
        />

        <SizeSelector
          product={product}
          variantIndex={selectedVariant.index}
          selectedSize={selectedVariant.size}
          onSizeSelect={handleSizeSelect}
        />

        <Add cartItem={cartItem} />

        <Divider />

        <div className="space-y-2">
          <h2 className="text-sm">{product.description}</h2>
          {Object.entries(product.specifications).map(([key, value], index) => (
            <div className="flex items-center gap-2" key={`spec-${index}`}>
              <span className="text-lg leading-7">•</span>
              <div className="text-sm">
                <span className="font-medium">{key}: </span>
                <span>{value}</span>
              </div>
            </div>
          ))}
        </div>

        <Divider />
        <h1 className="text-2xl">User Reviews</h1>
      </div>
    </div>
  );
};

export default ProductDetailPage;