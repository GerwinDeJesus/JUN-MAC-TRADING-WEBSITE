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

const PopupSold = ({ setOpenPopup, setUpdateTable }: PropsType) => {
  const productData = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [soldInput, setSoldInput] = useState<number>(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const soldQuantity = Number(soldInput);

    if (soldQuantity <= 0) {
      makeToast("Please enter a valid sold quantity.");
      return;
    }

    if (soldQuantity > productData.stock) {
      makeToast("Sold quantity cannot be greater than stock.");
      return;
    }

        const updatedProduct = {
        ...productData,
        sold: (productData.sold || 0) + soldQuantity,
        stock: productData.stock - soldQuantity,
        soldQty: soldQuantity, // ✅ Add this
      };


    try {
      dispatch(setLoading(true));
      await axios.put(`/api/edit_product/${productData._id}`, updatedProduct);

      makeToast("Product sold successfully!");
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

        <h2 className="text-2xl mb-6">Add Sold Quantity</h2>

        <p className="mb-2">Product: <strong>{productData.name}</strong></p>
        <p className="mb-2">Current Stock: <strong>{productData.stock}</strong></p>
        <p className="mb-4">
           Updated Sold:{" "}
         <strong>{(productData.sold || 0) + soldInput}</strong>
</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border border-gray-500 outline-none px-4 py-2 rounded-lg w-full"
            type="number"
            placeholder="Enter quantity sold"
            value={soldInput}
            onChange={(e) => setSoldInput(Number(e.target.value))}
            required
          />
          <button className="bg-accent text-white px-8 py-2 rounded-lg">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupSold;
