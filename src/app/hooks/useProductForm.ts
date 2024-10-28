import { useState } from "react";
import { Product, Variation, VariationImageBlob } from "@/types/product";
import { Category } from "@/types/category";
export const useProductForm = (initialProduct: Product) => {
  const [formData, setFormData] = useState<Product>(initialProduct);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const beforeUploadProduct = async (): Promise<Product> => {
    let updatedProduct = { ...formData };
    if (deletedImages.length > 0) {
      try {
        await Promise.all(
          deletedImages.map((filename) => deleteProductImage(filename))
        );
      } catch (error) {
        console.error("Error deleting images:", error);
        if (error) {
          const response = error as Response;
          if (response.status >= 500) {
            throw error;
          }
        }
      }
    }
    const uploadedImageIds = await Promise.all(
      formData.variations?.map((v) =>
        Promise.all(v.blobs?.map((b) => uploadProductImage(b)))
      )
    );
    for (let i = 0; i < formData.variations.length; i++) {
      const variation = formData.variations[i];
      const updatedVariation = {
        ...variation,
        images: [...variation.images, ...uploadedImageIds[i]],
        blobs: [],
      };
      updatedProduct = {
        ...updatedProduct,
        variations: updatedProduct.variations.map((v, j) =>
          i === j ? updatedVariation : v
        ),
      };
    }
    setFormData((prev) => ({
      ...prev,
      ...updatedProduct,
    }));
    return updatedProduct;
  };
  const handleDeleteProduct = async () => {
    try {
      await Promise.all(
        formData.variations.map((v) => {
          try {
            return Promise.all(v.images.map((i) => deleteProductImage(i)));
          } catch (error) {
            console.error("Error deleting images:", error);
            if (error) {
              const response = error as Response;
              if (response.status >= 500) {
                throw error;
              }
            }
          }
        })
      );
    } catch (error) {
      console.error("Error deleting images:", error);
      if (error) {
        const response = error as Response;
        if (response.status >= 500) {
          throw error;
        }
      }
    }

    try {
      await deleteProduct(formData.product_id);
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error) {
        const response = error as Response;
        if (response.status >= 500) {
          throw error;
        }
      }
    }
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
  const deleteProductImage = async (filename: string): Promise<string> => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/v1/product/image/" + filename,
        {
          method: "DELETE",
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
  type  x ={
    name: string;
    value: string;
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement  >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(name, value);
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
      // const newVariations = [...prev.variations];
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
      return { ...prev, variations: [...prev.variations, emptyVariation] };
    });
  };

  const removeVariation = (index: number) => {
    setDeletedImages((prev) => [...prev, ...formData.variations[index].images]);
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
  const removeImage = (varIdx: number, imgIdx: number) => {
    setDeletedImages((prev) => [
      ...prev,
      formData.variations[varIdx].images[imgIdx],
    ]);
  };
  const deleteProduct = async (product_id: string) => {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/product/` + product_id,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
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
    removeImage,
    beforeUploadProduct,
    setFormData,
    handleDeleteProduct,
  };
};
