'use client';
import { useState, useEffect } from 'react';
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import { Product } from '@/components/ProductList';
const productList = [
  {
    _id: "4",
    name: "Nike Pegasus 41 Electric",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",

    quantity: 30,
  },
  {
    _id: "1",
    name: "Nike Icon",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",
    quantity: 20,
  },
  {
    _id: "2",
    name: "Jordan Sport",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/198ef57b-17dc-4964-9a69-c7f6d5babff5/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%81%E0%B8%B8%E0%B8%94%E0%B8%9C%E0%B8%B9%E0%B9%89-dri-fit-jordan-sport-tbDKb2.png",
    quantity: 10,
  },
  {
    _id: "3",
    name: "Nike SB Zoom Blazer Mid Electric",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0029ebe4-0ea3-4d8b-9e0d-b13ffa466165/NIKE+SB+ZOOM+BLAZER+MID.png",
    quantity: 30,
  },
  {
    _id: "4",
    name: "Nike Pegasus 41 Electric",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",

    quantity: 30,
  },
  {
    _id: "1",
    name: "Nike Icon",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",
    quantity: 20,
  },
  {
    _id: "2",
    name: "Jordan Sport",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/198ef57b-17dc-4964-9a69-c7f6d5babff5/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%81%E0%B8%B8%E0%B8%94%E0%B8%9C%E0%B8%B9%E0%B9%89-dri-fit-jordan-sport-tbDKb2.png",
    quantity: 10,
  },
  {
    _id: "3",
    name: "Nike SB Zoom Blazer Mid Electric",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0029ebe4-0ea3-4d8b-9e0d-b13ffa466165/NIKE+SB+ZOOM+BLAZER+MID.png",
    quantity: 30,
  },
  {
    _id: "4",
    name: "Nike Pegasus 41 Electric",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",

    quantity: 30,
  },
  {
    _id: "1",
    name: "Nike Icon",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",
    quantity: 20,
  },
  {
    _id: "2",
    name: "Jordan Sport",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/198ef57b-17dc-4964-9a69-c7f6d5babff5/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%81%E0%B8%B8%E0%B8%94%E0%B8%9C%E0%B8%B9%E0%B9%89-dri-fit-jordan-sport-tbDKb2.png",
    quantity: 10,
  },
  {
    _id: "3",
    name: "Nike SB Zoom Blazer Mid Electric",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0029ebe4-0ea3-4d8b-9e0d-b13ffa466165/NIKE+SB+ZOOM+BLAZER+MID.png",
    quantity: 30,
  },
  {
    _id: "4",
    name: "Nike Pegasus 41 Electric",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",

    quantity: 30,
  },
  {
    _id: "1",
    name: "Nike Icon",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",
    quantity: 20,
  },
  {
    _id: "2",
    name: "Jordan Sport",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/198ef57b-17dc-4964-9a69-c7f6d5babff5/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%81%E0%B8%B8%E0%B8%94%E0%B8%9C%E0%B8%B9%E0%B9%89-dri-fit-jordan-sport-tbDKb2.png",
    quantity: 10,
  },
  {
    _id: "3",
    name: "Nike SB Zoom Blazer Mid Electric",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0029ebe4-0ea3-4d8b-9e0d-b13ffa466165/NIKE+SB+ZOOM+BLAZER+MID.png",
    quantity: 30,
  },
  {
    _id: "4",
    name: "Nike Pegasus 41 Electric",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",

    quantity: 30,
  },
  {
    _id: "1",
    name: "Nike Icon",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",
    quantity: 20,
  },
  {
    _id: "2",
    name: "Jordan Sport",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/198ef57b-17dc-4964-9a69-c7f6d5babff5/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%81%E0%B8%B8%E0%B8%94%E0%B8%9C%E0%B8%B9%E0%B9%89-dri-fit-jordan-sport-tbDKb2.png",
    quantity: 10,
  },
  {
    _id: "3",
    name: "Nike SB Zoom Blazer Mid Electric",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0029ebe4-0ea3-4d8b-9e0d-b13ffa466165/NIKE+SB+ZOOM+BLAZER+MID.png",
    quantity: 30,
  },
];
const ListPage = ({ searchParams }:{searchParams: any}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/product/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({
          //   product_id: "01923cde-d281-77ac-bc1c-40edc804179c",
          //   name: "Ball"
          // })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
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
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">For You!</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ListPage;