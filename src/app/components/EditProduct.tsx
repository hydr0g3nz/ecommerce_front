"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Variation {
  sku: string;
  stock: number;
  size: string;
  color: string;
  price: number;
}

interface Product {
  product_id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  variations: Variation[];
  specifications: { [key: string]: string };
  review_ids: string[];
  rating: number;
  images: string[];
}

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch product data from API
      fetchProduct(id as string);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (product) {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSpecificationChange = (key: string, value: string) => {
    if (product) {
      setProduct({
        ...product,
        specifications: {
          ...product.specifications,
          [key]: value,
        },
      });
    }
  };

  const handleVariationChange = (index: number, field: keyof Variation, value: string | number) => {
    if (product) {
      const newVariations = [...product.variations];
      newVariations[index] = {
        ...newVariations[index],
        [field]: value,
      };
      setProduct({
        ...product,
        variations: newVariations,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/products/${product.product_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        if (response.ok) {
          alert('Product updated successfully');
          router.push('/products');
        } else {
          throw new Error('Failed to update product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-1">Description:</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="w-full border rounded px-2 py-1"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="brand" className="block mb-1">Brand:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={product.brand}
          onChange={handleInputChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block mb-1">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleInputChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Specifications</h2>
      {Object.entries(product.specifications).map(([key, value]) => (
        <div key={key} className="mb-2">
          <label htmlFor={`spec-${key}`} className="block mb-1">{key}:</label>
          <input
            type="text"
            id={`spec-${key}`}
            value={value}
            onChange={(e) => handleSpecificationChange(key, e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-6 mb-2">Variations</h2>
      {product.variations.map((variation, index) => (
        <div key={index} className="mb-4 p-2 border rounded">
          <div className="mb-2">
            <label htmlFor={`sku-${index}`} className="block mb-1">SKU:</label>
            <input
              type="text"
              id={`sku-${index}`}
              value={variation.sku}
              onChange={(e) => handleVariationChange(index, 'sku', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-2">
            <label htmlFor={`stock-${index}`} className="block mb-1">Stock:</label>
            <input
              type="number"
              id={`stock-${index}`}
              value={variation.stock}
              onChange={(e) => handleVariationChange(index, 'stock', parseInt(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-2">
            <label htmlFor={`size-${index}`} className="block mb-1">Size:</label>
            <input
              type="text"
              id={`size-${index}`}
              value={variation.size}
              onChange={(e) => handleVariationChange(index, 'size', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-2">
            <label htmlFor={`color-${index}`} className="block mb-1">Color:</label>
            <input
              type="text"
              id={`color-${index}`}
              value={variation.color}
              onChange={(e) => handleVariationChange(index, 'color', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-2">
            <label htmlFor={`price-${index}`} className="block mb-1">Price:</label>
            <input
              type="number"
              id={`price-${index}`}
              value={variation.price}
              onChange={(e) => handleVariationChange(index, 'price', parseFloat(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Update Product
      </button>
    </form>
  );
};

export default EditProductPage;