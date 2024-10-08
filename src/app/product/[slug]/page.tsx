"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProduct } from "@/hooks/useProduct";
// Define types based on your Go structs
type Variation = {
  sku: string;
  stock: number;
  size: string;
  color: string;
  price: number;
};

type Product = {
  product_id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  variations: Variation[];
  specifications: { [key: string]: string };
  review_ids: string[];
  rating: number;
  images: string[];
};

const ProductDetailPage = () => {
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  );
  const id = usePathname().split("/")[2];
  const {
    product,
    imagesUpload,
    loading,
    error,
    updateProduct,
    setProduct,
    setImagesUpload,
  } = useProduct(id);
  const router = useRouter();
  useEffect(() => {
    if (product.variations.length > 0) {
      setSelectedVariation(product.variations[0]);
    }
  }, [product]);
  const handleAddToCart = () => {
    if (selectedVariation) {
      // Implement add to cart logic here
      console.log("Added to cart:", selectedVariation);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square relative">
                <Image
                  src={
                    "/products/" + product.images[0] || "/placeholder-image.jpg"
                  }
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.slice(1).map((image, index) => (
                  <Image
                    key={index}
                    src={"/products/" + image}
                    alt={`${product.name} ${index + 2}`}
                    width={80}
                    height={80}
                    className="rounded-md cursor-pointer"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-bold">
                $
                {selectedVariation
                  ? selectedVariation.price.toFixed(2)
                  : "Select a variation"}
              </p>
              <p>{product.description}</p>
              <div>
                <h3 className="font-semibold mb-2">Select Variation:</h3>
                <Select
                  onValueChange={(value) =>
                    setSelectedVariation(JSON.parse(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a variation" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variations.map((variation) => (
                      <SelectItem
                        key={variation.sku}
                        value={JSON.stringify(variation)}
                      >
                        {variation.size} - {variation.color} ($
                        {variation.price.toFixed(2)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddToCart} disabled={!selectedVariation}>
                Add to Cart
              </Button>
            </div>
          </div>
          <Tabs defaultValue="specifications" className="mt-8">
            <TabsList>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications">
              <ul className="list-disc pl-5">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews">
              <p>Reviews coming soon...</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
