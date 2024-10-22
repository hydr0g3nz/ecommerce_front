import React from "react";
import { Product } from "@/types/product";
import { useProductForm } from "@/hooks/useProductForm";
import BasicInfo from "@/components/BasicInfo";
import Specifications from "@/components/Specifications";
import Variations from "@/components/Variations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductFormProps {
  product: Product;
  onSubmit: (product: Product) => void;
  mode: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  mode,
}) => {
  const {
    formData,
    handleInputChange,
    handleSpecificationChange,
    handleVariationChange,
    addVariation,
    removeVariation,
    addSpecification,
    removeSpecification,
    beforeUploadProduct,
    removeImage,
    setFormData,
  } = useProductForm(product);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("before", formData);
    let updatedProduct = await beforeUploadProduct();
    console.log("after", updatedProduct);
    onSubmit(updatedProduct);
    // setFormData((prev) => ({ ...prev, ...updatedProduct }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <BasicInfo product={formData} onChange={handleInputChange} />
      </Card>
      <Card>
        <Specifications
          specifications={formData.specifications}
          onChange={handleSpecificationChange}
          onAdd={addSpecification}
          onRemove={removeSpecification}
        />
      </Card>
      <Card>
        <Variations
          variations={formData.variations}
          onChange={handleVariationChange}
          onAdd={addVariation}
          onRemove={removeVariation}
          onRemoveImage={removeImage}
        />
      </Card>
      <Button type="submit" className="w-full">
        {mode === "add" ? "Create Product" : "Update Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
