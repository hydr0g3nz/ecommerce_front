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
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
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
  } = useProductForm(product);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    let updatedProduct = await beforeUploadProduct();
    onSubmit(updatedProduct);
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
        />
      </Card>
      <Button type="submit" className="w-full">
        Update Product
      </Button>
    </form>
  );
};

export default ProductForm;
