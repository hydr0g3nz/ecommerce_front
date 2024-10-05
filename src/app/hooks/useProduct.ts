import { useState, useEffect } from "react";
import { Product } from "@/types/product";

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
    images: [],
  });
  const [imagesUpload, setImagesUpload] = useState<Blob[]>([]);
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
  const beforeUploadProduct = () => {
    if (imagesUpload.length > 0) {
      imagesUpload.forEach((image) => async () => {
        const imgId = await updatedProductImage(image);
        setProduct({
          ...product,
          images: [...product.images, imgId],
        });
      });
    }
  };
  const updateProduct = async (updatedProduct: Product) => {
    try {
      await beforeUploadProduct();
      const response = await fetch(`http://127.0.0.1:8080/api/v1/product/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      setProduct(updatedProduct);
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    }
  };
  const updatedProductImage = async (image: Blob): Promise<string> => {
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
      if (response.ok) {
        const data = await response.json();
        return data.filename;
      } else {
        console.error(
          "Failed to upload image:",
          response.status,
          response.statusText
        );
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  return {
    product,
    imagesUpload,
    loading,
    error,
    updateProduct,
    setImagesUpload,
  };
};
