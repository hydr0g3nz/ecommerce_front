import { useState } from "react";
import { Product, Variation, VariationImageBlob } from "@/types/product";

export const useProductForm = (initialProduct: Product) => {
  const [formData, setFormData] = useState<Product>(initialProduct);
  const beforeUploadProduct = async (): Promise<Product> => {
    let updatedProduct = { ...formData };

    const uploadedImageIds = await Promise.all(
      formData.variations.map((v) => Promise.all(v.blobs.map((b) => uploadProductImage(b))))
    );
    console.log("Uploaded image IDs:", uploadedImageIds);
    for (let i = 0; i < formData.variations.length; i++) {
      const variation = formData.variations[i];
      const updatedVariation = { ...variation, images: [...variation.images, ...uploadedImageIds[i]] };
      updatedProduct = {
        ...updatedProduct,
        variations: [...updatedProduct.variations, updatedVariation],
      };
    }

    return updatedProduct;
  };
  const uploadProductImage = async (image: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("image", image, "cropped_image.jpg");

    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/v1/product/image",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
      return data.filename;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }));
  };

  const handleVariationChange = (
    index: number,
    field: keyof Variation,
    value: string | number | string[] | Blob[]
  ) => {
    setFormData((prev) => {
      const newVariations = [...prev.variations];
      newVariations[index] = { ...newVariations[index], [field]: value };
      return { ...prev, variations: newVariations };
    });
  };

  const addVariation = () => {
    setFormData((prev) => {
      const newVariations = [...prev.variations];
      const emptyVariation = {
        sku: "",
        price: 0,
        stock: 0,
        size: "",
        color: "",
        images: [],
        sale: 0,
        blobs: [],
      };
      return { ...prev, variations: [...newVariations, emptyVariation] };
    });
  };

  const removeVariation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, "": "" },
    }));
  };

  const removeSpecification = (key: string) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  return {
    formData,
    handleInputChange,
    handleSpecificationChange,
    handleVariationChange,
    addVariation,
    removeVariation,
    addSpecification,
    removeSpecification,
    beforeUploadProduct,
  };
};
