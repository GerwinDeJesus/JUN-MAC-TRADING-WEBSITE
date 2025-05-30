"use client";

import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { RiShoppingCartLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    href: "/admin/dashboard",
  },
  {
    title: "Add Product",
    icon: <RiShoppingCartLine />,
    href: "/admin/products",
  },
  {
    title: "Sold Product",
    icon: <MdDashboard />,
    href: "/admin/sell_product",
  },
  {
    title: "Low Stock",
    icon: <MdDashboard />,
    href: "/admin/lowstock",
  },
  {
    title: "Zero Stock",
    icon: <MdDashboard />,
    href: "/admin/zero_stock",
  },
  {
    title: "Transactions",
    icon: <GrTransaction />,
    href: "/admin/transactions",
  },
];

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="bg-white w-[300px] min-h-screen p-4 shrink-0">
      <div className="flex items-center gap-4">
        <Image
          src="/blacklogo.png"
          alt="logo"
          width={48}    // Adjust size as needed
          height={48}
          className="rounded-lg"
          priority       // optional: loads faster for above-the-fold images
        />
        <h2 className="text-[20px] font-semibold">JUN-MAC TRADING</h2>
      </div>

      <ul className="space-y-4 mt-6">
        {menus.map((menu) => (
          <Link
            key={menu.title}
            href={menu.href}
            className={`flex gap-2 items-center p-4 rounded-lg cursor-pointer hover:bg-pink hover:text-white ${
              pathName === menu.href ? "bg-pink text-white" : "bg-gray-200"
            }`}
          >
            <div className="text-[20px]">{menu.icon}</div>
            <p>{menu.title}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
