import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider2 from "@/components/Slider2";

const Sliders2 = () => {
  return (
    <>
      <Slider2 />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList products={[]}/>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-8">Category</h1>
        <CategoryList />
      </div>
    </>
  );
};

export default Sliders2;
