import ProductForm from "@/components/admin-panel/ProductForm";

const Products = () => {
  return (
    <div className="h-[calc(100vh-96px)] w-full grid place-items-center overflow-y-auto">
      <div className="bg-white w-[500px] rounded-lg p-4">
        <ProductForm />
      </div>
    </div>
  );
};

export default Products;
