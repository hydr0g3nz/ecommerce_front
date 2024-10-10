"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  { id: 1, url: "/JUMPMAN+FLIGHT+HBR+TEE.png" },
  { id: 2, url: "/JUMPMAN+FLIGHT+HBR+TEE2.jpeg" },
  { id: 3, url: "/JUMPMAN+FLIGHT+HBR+TEE3.jpeg" },
  { id: 4, url: "/JUMPMAN+FLIGHT+HBR+TEE4.jpeg" },
];

const ProductImages = ({ items = images }: { items?: typeof images }) => {
  const [index, setIndex] = useState(0);
  items =  images;
  return (
    <div className="flex grow gap-4">
      {/* Thumbnail images */}
      <div className="w-3/12 gap-2 mt-8 flex flex-col">
        {items.map((item, i) => (
          <div
            className=""
            key={item.id}
            onClick={() => setIndex(i)}
          >
            <Image 
              src={item.url} 
              alt="" 
              width={0}
              height={0}
              sizes="100%"
              style={{ width: "100%", height: "auto" }}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
      {/* Main image */}
      <div className="">
        <Image 
          src={items[index].url} 
          alt="" 
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "auto" }}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default ProductImages;