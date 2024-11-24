import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export interface Categories {
  [key: string]: Product;
}

export interface CategoryListProps {
  products: Categories | null;
}

const CategoryList = ({ products }: CategoryListProps) => {
  if (!products) return null;
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {Object.entries(products).map(([category, product]) => (
          <Link
            href={`/products?category=${category}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={product.product_id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/images/products/${product.variations[0]?.images[0] || ''}`}
                alt={product.category}
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-cl tracking-wide">{product.category}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
