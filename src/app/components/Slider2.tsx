"use client";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import CategoryList from "./CategoryList";
import { ProductCache } from "@/types/product";

const Slider2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<ProductCache[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product-hero/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //   product_id: "01923cde-d281-77ac-bc1c-40edc804179c",
            //   name: "Ball"
            // })
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  })
  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div className="w-max h-full flex transition-all erase-in-out duration-1000" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        {products.map((slide, index) => (
          <div
            key={"slider"+slide.id}
            className="w-screen h-full flex gap-16 xl:flex-row"
          >
            <div className="w-1/2 flex flex-col justify-center items-center gap-5 2xl:gap-10 text-center">
              <h1 className="text-3xl font-bold">{slide.name}</h1>
              <h1 className="text-3xl font-bold text-red-500 "><span className="text-red-500">Sale </span>{slide.sale} %</h1>
              <h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit minima quaerat rem explicabo iste commodi,
                possimus exercitationem saepe mollitia, harum nam, eveniet vero
                illo corrupti omnis odit autem maxime. Fuga!
              </h2>
              <Link href={`/product/${slide.id}`}>
                <Button>Shop now</Button>
              </Link>
            </div>
            <div className="relative w-1/2 flex justify-center items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${slide.image1}`}
                alt={slide.name}
                fill
                sizes="100%"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {products.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600  cursor-pointer  flex items-center justify-center ${
              currentSlide === index ? "scale-150" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            
            {currentSlide === index && (
              <div className="w-[6px] h-[6px] rounded-full bg-gray-600 cursor-pointer"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider2;
