import { useState, useEffect } from "react";
import { Product, Variation, VariationImageBlob } from "@/types/product";

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product>({
    product_id: "",
    name: "",
    description: "",
    brand: "",
    category: "",
    variations: [],
    specifications: {},
    review_ids: [],
    rating: 0,
  });
  const [imagesUpload, setImagesUpload] = useState<VariationImageBlob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8080/api/v1/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updatedVariantImages = (
    product: Product,
    sku: string,
    newImages: string[]
  ): Product => {
    const updatedVariations = product.variations.map((v) =>
      v.sku === sku ? { ...v, images: [...v.images, ...newImages] } : v
    );
    return { ...product, variations: updatedVariations };
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

  const beforeUploadProduct = async (): Promise<Product> => {
    if (imagesUpload.length === 0) {
      return product;
    }

    let updatedProduct = { ...product };

    for (const variant of imagesUpload) {
      const uploadedImageIds = await Promise.all(
        variant.images.map((image) => uploadProductImage(image))
      );
      updatedProduct = updatedVariantImages(
        updatedProduct,
        variant.variant,
        uploadedImageIds
      );
    }

    return updatedProduct;
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      const updatedProduct = await beforeUploadProduct();
      await updateProductApi(updatedProduct);
      setImagesUpload([]);
      setProduct(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateProductApi = async (updatedProduct: Product) => {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/product/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
  };

  return {
    product,
    imagesUpload,
    loading,
    error,
    updateProduct,
    setProduct,
    setImagesUpload,
  };
};