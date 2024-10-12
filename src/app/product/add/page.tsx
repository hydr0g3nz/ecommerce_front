"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Product } from "@/types/product";
import { useProduct } from "@/hooks/useProduct";
import ProductForm from "@/components/ProductForm";
import ImageUploader from "@/components/ImageUploader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNewProduct } from "@/hooks/useAddProduct";
const EditProductPage: React.FC = () => {
  const {
    product,
    imagesUpload,
    loading,
    error,
    createProduct,
    setImagesUpload,
    addVariation,
    removeVariation,
    updateProductField,
  } = useNewProduct();
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <ProductForm product={product} onSubmit={createProduct} />
    </div>
  );
};

export default EditProductPage;
