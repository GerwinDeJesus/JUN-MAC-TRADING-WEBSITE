"use client";

import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface PropsType {
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const PopupRestock = ({ setOpenPopup, setUpdateTable }: PropsType) => {
  const productData = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [addStock, setAddStock] = useState<number>(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (addStock <= 0) {
      makeToast("Please enter a valid quantity to restock.");
      return;
    }

    const updatedProduct = {
      ...productData,
      stock: Number(productData.stock) + addStock,
    };

    try {
      dispatch(setLoading(true));
      await axios.put(`/api/edit_product/${productData._id}`, updatedProduct);

      makeToast("Product restocked successfully!");
      setUpdateTable((prev) => !prev);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
      setOpenPopup(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center">
      <div className="bg-white w-[500px] py-8 px-6 rounded-lg text-center relative">
        <IoIosCloseCircleOutline
          className="absolute text-2xl right-0 top-0 m-4 cursor-pointer hover:text-red-600"
          onClick={() => setOpenPopup(false)}
        />

        <h2 className="text-2xl mb-6">Restock Product</h2>

        <p className="mb-2">Product: <strong>{productData.name}</strong></p>
        <p className="mb-2">Current Stock: <strong>{productData.stock}</strong></p>
        <p className="mb-4">
          Updated Stock: <strong>{Number(productData.stock) + addStock}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border border-gray-500 outline-none px-4 py-2 rounded-lg w-full"
            type="number"
            placeholder="Enter quantity to restock"
            value={addStock}
            onChange={(e) => setAddStock(Number(e.target.value))}
            required
          />
          <button className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700">
            Restock
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupRestock;
