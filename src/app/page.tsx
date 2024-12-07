"use client";
import { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider2 from "@/components/Slider2";
import { Categories } from "@/components/CategoryList";

const Sliders2 = () => {
  const [products, setProducts] = useState([]);
  const [productsCategoryDelegate, setProductsCategoryDelegate] = useState<Categories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setProducts(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchProductsCategoryDelegate = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/category-delegate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setProductsCategoryDelegate(data.categories);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductsCategoryDelegate();
    fetchProducts();
  }, []);

  return (
    <>
      <Slider2 />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList products={products}/>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-8">Category</h1>
        <CategoryList  products={productsCategoryDelegate}/>
      </div>
    </>
  );
};

export default Sliders2;
