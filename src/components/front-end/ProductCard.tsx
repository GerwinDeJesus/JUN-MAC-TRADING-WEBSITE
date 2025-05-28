import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import { useState } from "react";
import ProductPopup from "./ProductPopup"; // import the popup component
import Image from "next/image";

interface Props {
  id: string;
  img: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  expectedRestockDate?: string | null;
  onClose: () => void;
}


const ProductCard = ({
  id,
  img,
  title,
  category,
  price,
  stock,
  description,
  expectedRestockDate,
  onClose,
}: Props) => {
  // component code here

  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const addProductToCart = () => {
    const payload = {
      id,
      img,
      title,
      stock,
      description,
      price,
      quantity: 1,
      expectedRestockDate,
    };

    dispatch(addToCart(payload));
    toast.success("Added to Cart");
  };

  return (
    <>
      <div
        className="border border-gray-200 cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <div className="text-center border-b border-gray-200 relative w-48 h-80 mx-auto">
          <Image
            src={img}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="192px"
            priority
          />
        </div>

        <div className="px-8 py-4">
          <p className="text-gray-500 text-[14px] font-medium">{category}</p>
          <h2 className="font-medium">{title}</h2>

          <div className="flex justify-between items-center mt-4">
            <h2 className="font-medium text-accent text-xl">Stock: {stock}</h2>
          </div>

          {stock === 0 && expectedRestockDate ? (
            <p className="text-sm text-red-600 mt-2">
              Expected Restock Date:{" "}
              {new Date(expectedRestockDate).toLocaleDateString()}
            </p>
          ) : null}

          <div className="flex justify-between items-center mt-5">
            <h2 className="font-medium text-accent text-xl">
              Estimated Price: ₱{price}
            </h2>
          </div>
        </div>
      </div>

      {showPopup && (
        <ProductCard
          id={id}
          img={img}
          title={title}
          category={category}
          price={price}
          stock={stock}
          description={description}
          expectedRestockDate={expectedRestockDate} // Pass this prop
          onClose={() => setShowPopup(false)} // Pass onClose callback
        />
      )}
    </>
  );
};

export default ProductCard;
