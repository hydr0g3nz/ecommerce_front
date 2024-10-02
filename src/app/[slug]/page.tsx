
import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const product = {
    _id: "1",
    media: {
      items: [
        ///Add mock media items here
      ],
    },
    name: "Sample Product",
    description: "This is a sample product description.",
    price: {
      price: 100,
      discountedPrice: 80,
    },
    variants: [
      {
        _id: "1",
        name: "Variant 1",
        price: 100,
        stock: {
          quantity: 10,
          inStock: true,
        },
        choices: {
          Size: "M",
          Color: "Red",
        },
      },
      {
        _id: "2",
        name: "Variant 2",
        price: 200,
        stock: {
          quantity: 0,
          inStock: false,
        },
        choices: {
          Size: "L",
          Color: "Blue",
        },
      },
    ],
    productOptions: [
      {
        _id: "size",
        name: "Size",
        values: ["S", "M", "L"],
        choices: [
          { description: "Small", value: "S" },
          { description: "Medium", value: "M" },
          { description: "Large", value: "L" },
        ],
      },
      {
        _id: "color",
        name: "Color",
        values: ["Red", "Blue", "Green"],
        choices: [
          { description: "Red", value: "Red" },
          { description: "Blue", value: "Blue" },
          { description: "Green", value: "Green" },
        ],
      },
    ],
    stock: {
      quantity: 10,
    },
    additionalInfoSections: [
      {
        title: "Section 1",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit minima quaerat rem explicabo iste commodi, possimus exercitationem saepe mollitia, harum nam, eveniet vero illo corrupti omnis odit autem maxime. Fuga! harum nam, eveniet vero illo corrupti omnis odit autem maxime. Fuga!",
        
      },
      {
        title: "Section 2",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit minima quaerat rem explicabo iste commodi, possimus exercitationem saepe mollitia, harum nam, eveniet vero illo corrupti omnis odit autem maxime. Fuga! harum nam, eveniet vero illo corrupti omnis odit autem maxime. Fuga!",
      },
      {
        title: "Section 3",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit minima quaerat rem explicabo iste commodi, possimus exercitationem saepe mollitia, harum nam, eveniet vero illo corrupti omnis odit autem maxime. Fuga! harum nam, eveniet vero illo corrupti omnis odit autem maxime. Fuga!",
      },
      {
        title: "Section 4",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit minima quaerat rem explicabo iste commodi, possimus exercitationem saepe mollitia, harum nam, eveniet vero illo corrupti omnis odit autem maxime. Fuga! harum nam, eveniet vero illo corrupti omnis odit autem maxime. Fuga!",
      },
    ],
  };

  return (
    <div className="min-h-max px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="flex flex-col grow lg:w-1/2 lg:sticky top-20">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        {/* <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  );
};

export default SinglePage;
