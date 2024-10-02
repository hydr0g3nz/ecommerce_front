import Image from "next/image";
import Link from "next/link";
const productList = [
  {
    _id: "1",
    name: "Nike Icon",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/49545dac-67b5-4c49-b82f-83dcd07b375a/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B9%89%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89-pegasus-41-electric-CNd0pW.png",
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
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/49545dac-67b5-4c49-b82f-83dcd07b375a/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B9%89%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89-pegasus-41-electric-CNd0pW.png",
    quantity: 30,
  },
  {
    _id: "5",
    name: "Nike Icon",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/49545dac-67b5-4c49-b82f-83dcd07b375a/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B9%89%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89-pegasus-41-electric-CNd0pW.png",
    quantity: 20,
  },
  {
    _id: "6",
    name: "Jordan Sport",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/198ef57b-17dc-4964-9a69-c7f6d5babff5/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%82%E0%B8%99%E0%B8%81%E0%B8%B8%E0%B8%94%E0%B8%9C%E0%B8%B9%E0%B9%89-dri-fit-jordan-sport-tbDKb2.png",
    quantity: 10,
  },
  {
    _id: "7",
    name: "Nike SB Zoom Blazer Mid Electric",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0029ebe4-0ea3-4d8b-9e0d-b13ffa466165/NIKE+SB+ZOOM+BLAZER+MID.png",
    quantity: 30,
  },
  {
    _id: "8",
    name: "Nike Pegasus 41 Electric",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/49545dac-67b5-4c49-b82f-83dcd07b375a/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B9%89%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89-pegasus-41-electric-CNd0pW.png",
    quantity: 30,
  },
];
const productList2 = [
  {
    _id: "9",
    name: "Nike Pegasus 41 Electric",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ddceaccc-4f2e-4cbd-84fc-b9053cb26c3f/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B9%81%E0%B8%88%E0%B9%87%E0%B8%84%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%AD%E0%B8%9C%E0%B8%B9%E0%B9%89-icon-8CZGX4.png",

    quantity: 30,
  },
  {
    _id: "10",
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
const CategoryList = () => {
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {productList.map((product, i) => (
          <Link
            href="/product/1"
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4  xl:w-1/6"
            key={product._id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={product.image}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-cl tracking-wide">{product.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
