import { useState, useEffect } from "react";
import { Product, Variation, VariationImageBlob } from "@/types/product";
import { Category } from "@/types/category";
import { useAuth } from "@/hooks/useAuth";
import Variations from "@/components/Variations";
import { toast } from "./use-toast";
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
  const [category, setCategory] = useState<Category[]>([]);
  const { accessToken } = useAuth();
  const getProduct = async (id: string) => {
    console.log(product);
    fetchProductApi(id);
    fetchCategoryApi();
  };

  const fetchProductApi = async (productId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${productId}`
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
      console.log("loading false");
    }
  };
  const fetchCategoryApi = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }
      const data = await response.json();
      setCategory(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching category:", error);
      setError("Failed to load category. Please try again.");
    } finally {
      setLoading(false);
      console.log("loading false");
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
      toast({
        title: "Success",
        description: "Product created successfully",
      });

      setLoading(false);
    }
  };

  const createProductApi = async (newProduct: Product) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newProduct),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    const createdProduct = await response.text();
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
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
      setLoading(false);
    }
  };

  const updateProductApi = async (updatedProduct: Product) => {
    console.log("updatedProduct", updatedProduct);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedProduct),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
  };

  return {
    product,
    category,
    loading,
    error,
    setProduct,
    getProduct,
    createProduct,
    updateProduct,
    fetchCategoryApi,
  };
};
