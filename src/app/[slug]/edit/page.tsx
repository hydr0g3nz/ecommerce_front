"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Product } from "@/types/product";
import { useProduct } from "@/hooks/useProduct";
import ProductForm from "@/components/ProductForm";
import ImageUploader from "@/components/ImageUploader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EditProductPage: React.FC = () => {
  const id = usePathname().split("/")[1];
  const {
    product,
    imagesUpload,
    loading,
    error,
   updateProduct,
    setProduct,
    setImagesUpload,
  } = useProduct(id);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Images</h2>
        </CardHeader>
        <CardContent>
          <ImageUploader
            imagesUpload={imagesUpload}
            images={product.images}
            setProduct={setProduct}
            newImages={setImagesUpload}
          />
        </CardContent>
      </Card>
      <ProductForm product={product} onSubmit={updateProduct} />
    </div>
  );
};

export default EditProductPage;
