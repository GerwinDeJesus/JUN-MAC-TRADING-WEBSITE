import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IProduct } from "@/app/admin/zero_stock/page";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setProduct } from "@/redux/features/productSlice";
import axios from "axios";
import { setLoading } from "@/redux/features/loadingSlice";
import { makeToast } from "@/utils/helper";

interface PropsType {
  srNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const ZeroStockRow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDelete = async () => {
    try {
      dispatch(setLoading(true));

      await axios.delete("/api/uploadthing", {
        data: { fileKey: product.fileKey },
      });

      await axios.delete(`/api/delete_product/${product._id}`);

      makeToast("Product Deleted Successfully!");
      setUpdateTable((prev) => !prev);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <tr>
      <td>{srNo}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>
        {product.expectedRestockDate && !isNaN(new Date(product.expectedRestockDate).getTime())
            ? new Date(product.expectedRestockDate).toLocaleDateString()
            : <span className="text-red-500 italic">Not set</span>}
        </td>
        

      <td>{product.price}</td>
      <td className="py-2">
        <Image
          src={product.imgSrc || "/placeholder.jpg"}
          width={40}
          height={40}
          alt="Product image"
          className="rounded object-cover"
        />
      </td>
      <td>
        <div className="text-2xl flex items-center gap-2 text-gray-600">
          <CiEdit
            className="cursor-pointer hover:text-black"
            onClick={onEdit}
          />
          <RiDeleteBin5Line
            className="text-[20px] cursor-pointer hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default ZeroStockRow;
