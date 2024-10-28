"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Product } from "@/types/product";
import { useProduct } from "@/hooks/useProduct";
import ProductForm from "@/components/ProductForm";
import ImageUploader from "@/components/ImageUploader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
interface EditProductProps {
  handleModalClose: () => void;
}

const EditProduct: React.FC<EditProductProps> = (
  { handleModalClose }
) => {
  const id = usePathname().split("/")[2];
  const { product, category,loading, error, updateProduct, getProduct } = useProduct();
  useEffect(() => {
    getProduct(id);
  }, []);
  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div >
    {/* <div className="max-w-4xl mx-auto mt-8 p-4 space-y-6"> */}
      <ProductForm product={product} categories={category} onSubmit={updateProduct} mode="update" handleModalClose={handleModalClose} />
    </div>
  );
};

export default EditProduct;
