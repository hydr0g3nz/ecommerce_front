"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Product } from "@/types/product";
import { useProduct } from "@/hooks/useProduct";
import ProductForm from "@/components/ProductForm";
import ImageUploader from "@/components/ImageUploader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EditProductPage: React.FC = () => {
  const id = usePathname().split("/")[1];
  const { product, loading, error, updateProduct, getProduct } = useProduct();
  useEffect(() => {
    getProduct(id);
  }, []);
  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm product={product} onSubmit={updateProduct} mode="update" />
    </div>
  );
};

export default EditProductPage;
