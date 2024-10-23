"use client";

import Add from "@/components/Add";
import ProductImages from "@/components/ProductImages";
import { notFound } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
const ProductDetailPage: React.FC = () => {
  const [variantIndex, setVariantIndex] = useState<number>(0);
  const id = usePathname().split("/")[2];
  const { product, loading, error, updateProduct, getProduct } = useProduct();
  const [selectedSize, setSelectedSize] = useState("");
  const colors = [
    ...new Set(
      product.variations.map((v) => {
        return v.color;
      })
    ),
  ];
  const sizes = [
    ...new Set(
      product.variations.map((v) => {
        return v.size;
      })
    ),
  ];
  useEffect(() => {
    console.log("id", id);
    getProduct(id);
    console.log("product", product);
    if (!product.variations) {
      setVariantIndex(-1);
    } else {
      setVariantIndex(0);
    }
  }, []);
  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  return variantIndex === -1 ? (
    notFound()
  ) : (
    <div className="min-h-max px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="flex flex-col grow lg:w-7/12 lg:sticky top-20">
        {variantIndex === -1 ? (
          <div>Image Not Found</div>
        ) : (
          <ProductImages images={product.variations?.[variantIndex]?.images} />
        )}
      </div>
      {/* Details */}
      <div className="w-full lg:w-5/12 flex flex-col gap-6">
        {JSON.stringify(colors)}
        {JSON.stringify(sizes)}
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.variations?.[variantIndex]?.price ===
        product.variations?.[variantIndex]?.price ? (
          <h2 className="font-medium text-2xl">
            ${product.variations?.[variantIndex]?.price}
          </h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.variations?.[variantIndex].price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.variations?.[variantIndex].price}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
        {/* => Variant */}
        <div className="flex gap-4">
          {colors?.map((v, i) => {
            let index = product.variations.findIndex((p) => p.color === v);
            return (
              <div
                className={
                  variantIndex === index
                    ? "rounded-md relative cursor-pointer w-2/12 h-auto border border-black"
                    : "rounded-md relative cursor-pointer w-2/12 h-auto hover:border-black hover:border"
                }
                key={i}
                onClick={() => setVariantIndex(index)}
              >
                <Image
                  src={`http://127.0.0.1:8080/api/v1/images/products/${product.variations?.[index]?.images?.[0]}`}
                  alt=""
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
        {/* => size */}
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-700">เลือกไซส์</span>
          <span className="text-sm text-gray-500 ml-2">
            คำแนะนำในการเลือกไซส์
          </span>
        </div>
        <div className="flex gap-2">
          {product.variations
            ?.filter((v) => v.color === product.variations[variantIndex].color)
            .map((v, _) => {
              const isAvailable = v.stock > 0;
              return (
                <button
                  key={v.size}
                  onClick={() => {
                    setSelectedSize(v.size);
                    setVariantIndex(
                      product.variations.findIndex(
                        (p) =>
                          p.size === v.size &&
                          p.color === product.variations[variantIndex].color
                      )
                    );
                  }}
                  className={`
                  h-10 w-10 flex items-center justify-center
                  border rounded
                  bg-white w-fit p-3 text-lg
                  ${
                    selectedSize === v.size
                      ? "border-black"
                      : "border-gray-300 hover:border-black"
                  }
                  ${
                    isAvailable
                      ? "hover:border-blue-500"
                      : "opacity-50 cursor-not-allowed"
                  }
                `}
                >
                  {v.size}
                </button>
              );
            })}
        </div>

        <div className="h-[2px] bg-gray-100" />
        {Object.entries(product.specifications).map(([key, value], index) => (
          <div className="text-sm" key={index}>
            <h4 className="font-medium mb-4">{key}</h4>
            <p>{value}</p>
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        {/* <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
