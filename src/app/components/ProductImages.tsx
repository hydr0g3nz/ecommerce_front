"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  {
    id: 1,
    url: "/JUMPMAN+FLIGHT+HBR+TEE.png",
  },
  {
    id: 2,
    url: "/JUMPMAN+FLIGHT+HBR+TEE2.jpeg",
  },
  {
    id: 3,
    url: "/JUMPMAN+FLIGHT+HBR+TEE3.jpeg",

  },
  {
    id: 4,
    url: "/JUMPMAN+FLIGHT+HBR+TEE4.jpeg",
  }
];

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  items = images;
  return (
    <div className="flex grow flex-col">
      {/* main image */}
      <div className="w-full aspect-[4/5] relative">
        
        <Image
          src={items[index].url}
          alt=""
          quality={100}
         fill
          // fill
          className="rounded-md"
        />
      </div>
      {/* selected image */}
      <div className="w-full  gap-4 mt-8 flex">
        {items.map((item: any, i: number) => (
          <div
            className="w-full aspect-[4/5] relative mt-8 cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
            onMouseEnter={() => setIndex(i)}
          >
            <Image
              src={item.url}
              alt=""
              fill
              sizes="100%"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
