"use client";
import React, { useState } from "react";
import  Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const slides = [
  {
    _id: "1",
    name: "Nike Icon",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",
    quantity: 20,
  },
  {
    _id: "2",
    name: "Jordan Sport",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/198ef57b-17dc-4964-9a69-c7f6d5babff5/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%81%E0%B8%B8%E0%B8%94%E0%B8%9C%E0%B8%B9%E0%B9%89-dri-fit-jordan-sport-tbDKb2.png",
    quantity: 10,
  },
  {
    _id: "3",
    name: "Nike SB Zoom Blazer Mid Electric",
    image:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0029ebe4-0ea3-4d8b-9e0d-b13ffa466165/NIKE+SB+ZOOM+BLAZER+MID.png",
    quantity: 30,
  },
  {
    _id: "4",
    name: "Nike Pegasus 41 Electric",
    image:"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/49545dac-67b5-4c49-b82f-83dcd07b375a/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B9%89%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89-pegasus-41-electric-CNd0pW.png",
    quantity: 30,
  }
];
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
      <Carousel
        className="w-1/3 "
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent>
          {slides.map((item, index) => (
            <CarouselItem key={index} className="w-full aspect-square flex items-center justify-center">
                    <Image src={item.image} alt={item.name} width={200} height={200} style={ { width: "100%", height: "auto" }}  />
              {/* <div className="p-1"> */}
                {/* <Card> */}
                  {/* <CardContent className="w-full flex aspect-square items-center justify-center"> */}
                  {/* </CardContent> */}
                {/* </Card> */}
              {/* </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
  );
};

export default Slider;
