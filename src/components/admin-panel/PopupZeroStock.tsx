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

const PopupRestockWithDate = ({ setOpenPopup, setUpdateTable }: PropsType) => {
  const productData = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [restockDate, setRestockDate] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!restockDate) {
      makeToast("Please enter an expected restock date.");
      return;
    }
      const updatedProduct = {
        ...productData,
        expectedRestockDate: restockDate,
      };

    try {
      dispatch(setLoading(true));
      console.log("Submitting updated product:", updatedProduct);
      await axios.put(`/api/edit_product/${productData._id}`, updatedProduct);

      makeToast("Expected restock date updated successfully!");
      setUpdateTable((prev) => !prev);
    } catch (err) {
      console.error(err);
      makeToast("Failed to update restock date.");
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

        <h2 className="text-2xl mb-6">Set Expected Restock Date</h2>

        <p className="mb-2">
          Product: <strong>{productData.name}</strong>
        </p>
        <p className="mb-2">
          Current Stock: <strong>{productData.stock}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border border-gray-500 outline-none px-4 py-2 rounded-lg w-full"
            type="date"
            value={restockDate}
            onChange={(e) => setRestockDate(e.target.value)}
            required
          />
          <button className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupRestockWithDate;
