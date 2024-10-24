import { useState, useEffect } from "react";
import { Product, Variation, VariationImageBlob } from "@/types/product";

export const useProduct = () => {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProduct = async (id: string) => {
    console.log(product);
    fetchProductApi(id);
  };

  const fetchProductApi = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8080/api/v1/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProduct((prevProduct) => ({ ...prevProduct, ...data }));
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const createProduct = async (addProduct: Product) => {
    try {
      setLoading(true);
      console.log(addProduct);
      await createProductApi(addProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createProductApi = async (newProduct: Product) => {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    const createdProduct = await response.json();
    return createdProduct;
  };
  const updateProduct = async (product: Product) => {
    try {
      setLoading(true);
      await updateProductApi(product);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    } finally {
      setProduct((prevProduct) => ({ ...prevProduct, ...product }));
      setLoading(false);
    }
  };

  const updateProductApi = async (updatedProduct: Product) => {
    console.log("updatedProduct", updatedProduct);
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
    loading,
    error,
    setProduct,
    getProduct,
    createProduct,
    updateProduct,
  };
};
