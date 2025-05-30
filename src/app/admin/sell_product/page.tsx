"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Popup from "@/components/admin-panel/PopupSold";
import ProductRow from "@/components/admin-panel/SoldProductModule";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading } from "@/redux/features/loadingSlice";
import { setProduct } from "@/redux/features/productSlice";

export interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  price: string;
  stock: number;
  sold: number;
  category: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("/api/get_products")
      .then((res) => {
        const formatted = res.data.map((p: IProduct) => ({
          ...p,
          stock: Number(p.stock),
          sold: Number(p.sold ?? 0),
        }));
        setProducts(formatted);
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable]);

  return (
    <div>
      <div className="bg-white rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Products Sold (Bar Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sold" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white h-[calc(100vh-480px)] rounded-lg p-4">
        <h2 className="text-3xl">Add Sold Products</h2>
        <div className="mt-4 h-[calc(100vh-540px)] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 border-t border-[#ececec]">
                <th>SR No.</th>
                <th>Name</th>
                <th>Categories</th>
                <th>Sold</th>
                <th>Price</th>
                <th>Picture</th>
                <th>Add Sold</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <ProductRow
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
