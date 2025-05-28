import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IProduct } from "@/app/admin/sell_product/page";
import { useAppDispatch } from "@/redux/hooks";
import { setProduct } from "@/redux/features/productSlice";
import axios from "axios";
import { setLoading } from "@/redux/features/loadingSlice";
import { makeToast } from "@/utils/helper";

interface PropsType {
  srNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct & { sold?: number };
}

const ProductRow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useAppDispatch();
  const [loadingSoldUpdate, setLoadingSoldUpdate] = useState(false);
  const [soldInput, setSoldInput] = useState<number>(0);

  useEffect(() => {
    const update = async () => {
      if (soldInput <= 0 || loadingSoldUpdate) return;

      const delta = soldInput;
      const newStock = Number(product.stock) - delta;
      const newSold = (product.sold || 0) + delta;

      if (newStock < 0) {
        makeToast("Not enough stock to sell.");
        return;
      }

      try {
        setLoadingSoldUpdate(true);
        dispatch(setLoading(true));

        await axios.put(`/api/update_stock_sold/${product._id}`, {
          stock: newStock,
          sold: newSold,
        });

        makeToast("Sold quantity updated successfully!");
        setUpdateTable(prev => !prev);
        setSoldInput(0);
      } catch (error) {
        console.error(error);
        makeToast("Failed to update sold quantity.");
      } finally {
        dispatch(setLoading(false));
        setLoadingSoldUpdate(false);
      }
    };

    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soldInput, loadingSoldUpdate, dispatch, product._id, product.sold, product.stock, setUpdateTable]);

  const onEdit = () => {
    dispatch(setProduct({
      ...product,
      stock: product.stock.toString(),  // Convert stock to string here to match IProduct
      sold: product.sold ?? 0,
      description: ""
    }));
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
        <div>Stock: {product.stock}</div>
        <div>Sold: {product.sold}</div>
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
        <div className="text-2xl flex items-center gap-2 text-gray-600 mt-2">
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

export default ProductRow;
