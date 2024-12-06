import { useState } from "react";
import { Product, Variation } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export const useProductForm = (initialProduct: Product) => {
  // State management
  const [formData, setFormData] = useState<Product>(initialProduct);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<{
    upload: boolean;
    delete: boolean;
    imageUpload: boolean;
    imageDelete: boolean;
  }>({
    upload: false,
    delete: false,
    imageUpload: false,
    imageDelete: false,
  });
  
  // Hooks
  const { accessToken } = useAuth();
  const { toast } = useToast();

  // Helper function to handle errors
  const handleError = (error: unknown, context: string) => {
    console.error(`Error in ${context}:`, error);
    
    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    // Show error toast
    toast({
      variant: "destructive",
      title: `Error ${context}`,
      description: errorMessage,
    });

    // Handle server errors
    if (error && (error as Response).status >= 500) {
      throw error;
    }
  };

  const beforeUploadProduct = async (): Promise<Product> => {
    setIsLoading(prev => ({ ...prev, upload: true }));
    let updatedProduct = { ...formData };
    
    try {
      // Handle deleted images
      if (deletedImages.length > 0) {
        setIsLoading(prev => ({ ...prev, imageDelete: true }));
        try {
          await Promise.all(
            deletedImages.map((filename) => deleteProductImage(filename))
          );
          toast({
            title: "Images deleted",
            description: `Successfully deleted ${deletedImages.length} images`,
          });
        } catch (error) {
          handleError(error, "deleting images");
        } finally {
          setIsLoading(prev => ({ ...prev, imageDelete: false }));
        }
      }

      // Upload new images
      setIsLoading(prev => ({ ...prev, imageUpload: true }));
      const uploadedImageIds = await Promise.all(
        formData.variations?.map((v) =>
          Promise.all(v.blobs?.map((b) => uploadProductImage(b)))
        )
      );

      // Update product with new image IDs
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
    } catch (error) {
      handleError(error, "updating product");
      throw error;
    } finally {
      setIsLoading(prev => ({ ...prev, upload: false, imageUpload: false }));
    }
  };

  const handleDeleteProduct = async () => {
    setIsLoading(prev => ({ ...prev, delete: true }));
    
    try {
      // Delete associated images first
      setIsLoading(prev => ({ ...prev, imageDelete: true }));
      await Promise.all(
        formData.variations.map((v) =>
          Promise.all(v.images.map((i) => deleteProductImage(i)))
        )
      );
      
      // Delete the product
      await deleteProduct(formData.product_id);
      
      toast({
        title: "Product deleted",
        description: "Successfully deleted product and associated images",
      });
    } catch (error) {
      handleError(error, "deleting product");
      throw error;
    } finally {
      setIsLoading(prev => ({ ...prev, delete: false, imageDelete: false }));
    }
  };

  const uploadProductImage = async (image: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("image", image, "cropped_image.jpg");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      
      const data = await response.json();
      return data.filename;
    } catch (error) {
      handleError(error, "uploading image");
      throw error;
    }
  };

  const deleteProductImage = async (filename: string): Promise<string> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/image/${filename}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      
      const data = await response.json();
      return data.filename;
    } catch (error) {
      handleError(error, "deleting image");
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
    
    toast({
      title: "Variation added",
      description: "New variation has been added to the product",
    });
  };

  const removeVariation = (index: number) => {
    setDeletedImages((prev) => [...prev, ...formData.variations[index].images]);
    setFormData((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index),
    }));
    
    toast({
      title: "Variation removed",
      description: "Variation has been removed from the product",
    });
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
    
    toast({
      title: "Specification removed",
      description: `Specification "${key}" has been removed`,
    });
  };

  const removeImage = (varIdx: number, imgIdx: number) => {
    setDeletedImages((prev) => [
      ...prev,
      formData.variations[varIdx].images[imgIdx],
    ]);
    
    toast({
      title: "Image marked for deletion",
      description: "Image will be deleted when saving the product",
    });
  };

  const deleteProduct = async (product_id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${product_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  };

  return {
    formData,
    isLoading,
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