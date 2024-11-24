"use client";
import React, { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
const ListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Build the URL with category filter if present
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/`;
        if (searchParams.get("category")) {
          url += `?category=${searchParams.get("category")}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

    fetchProducts();
  }, [searchParams]); // Re-fetch when searchParams changes

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen text-red-500">
      Error: {error}
    </div>
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* Campaign Banner */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* Filter Component */}
      <Filter />

      {/* Products Section */}
      <div className="mt-8">
        <h1 className="text-xl font-semibold mb-6">
          {products.length === 0 ? "No products found" : "For You!"}
        </h1>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default ListPage;