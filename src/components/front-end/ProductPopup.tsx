import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

interface Props {
  img: string;
  title: string;
  description: string;
  onClose: () => void;
  price: number;
  stock: number;
  category: string;
  expectedRestockDate?: string | null;
}

const ProductPopup = ({
  img,
  title,
  description,
  onClose,
  price,
  stock,
  category,
  expectedRestockDate,
}: Props) => {
  // Safely parse expected restock date if provided and valid
  const restockDate =
    expectedRestockDate && !isNaN(new Date(expectedRestockDate).getTime())
      ? new Date(expectedRestockDate).toLocaleDateString()
      : null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-popup-title"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
        >
          <AiOutlineClose />
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="w-full md:w-1/3 relative h-[400px]">
            <Image
              src={img || "/placeholder.jpg"}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority={true}
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Category: {category}</p>
            <h2
              id="product-popup-title"
              className="text-xl font-semibold mb-2"
            >
              {title}
            </h2>
            <p className="text-gray-700 text-sm mb-4">Description: {description}</p>

            <p className="text-lg font-bold text-accent mb-1">
              Price: ₱{price.toLocaleString()}
            </p>
            <p className="text-md text-gray-600 mb-2">Stock: {stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
