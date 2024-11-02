"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/product";
interface ProductImagesProps {
  images: string[];
}
const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(0);
  if (!images) return null;
  return (
    <div className="flex grow gap-4  justify-end">
      {/* Thumbnail images */}
      <div className="w-1/12 gap-2 flex flex-col content-start">
        {images?.map((url, i) => (
          <div
            className="relative cursor-pointer"
            key={i}
            onClick={() => setSelectedImg(i)}
            onMouseOver={() => setIndex(i)}
            onMouseLeave={() => setIndex(-1)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${url}`}
              alt=""
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
              className="rounded-md"
            />
            <div
              className={`${
                selectedImg === i ? "block" : "hidden"
              } absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-md`}
            />
          </div>
        ))}
      </div>
      {/* Main image */}
      <div className="min-w-[500px] ">
        <Image
          src={
            index !== -1
              ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${images[index]}`
              : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${images[selectedImg]}`
          }
          alt=""
          width={0}
          height={0}
          sizes="100%"
          quality={100}
          style={{ width: "100%", height: "auto" }}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default ProductImages;
