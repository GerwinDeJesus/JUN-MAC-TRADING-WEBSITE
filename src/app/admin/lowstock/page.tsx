"use client";

import Popup from "@/components/admin-panel/PopupRestock";
import RestockRow from "@/components/admin-panel/RestockRow";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import { useEffect, useState } from "react";

export interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  description: string;
  price: string;
  stock: string;       // consider changing to number if possible
  category: string;
  sold: number;
}

const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]); // <-- Explicitly typed here
  const [openPopup, setOpenPopup] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    axios
      .get("/api/get_products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable, dispatch]);

  return (
    <div>
      <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
        <h2 className="text-3xl">Low Stock Products</h2>

        <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 border-t border-[#ececec]">
                <th>SR No.</th>
                <th>Name</th>
                <th>Category</th>
                <th>Low Stock</th>
                <th>Price</th>
                <th>Picture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...products]
                .sort((a, b) => Number(a.stock) - Number(b.stock))
                .map((product: IProduct, index) => (
                  <RestockRow
                    key={product._id}
                    srNo={index + 1}
                    setOpenPopup={setOpenPopup}
                    setUpdateTable={setUpdateTable}
                    product={product}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {openPopup && (
        <Popup setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} />
      )}
    </div>
  );
};

export default Dashboard;
