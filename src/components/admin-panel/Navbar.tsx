import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="py-3 px-4 bg-white flex justify-between items-center">
      <h2 className="text-xl">Admin Panel</h2>

      <Image
        className="rounded-full cursor-pointer"
        src={session?.user?.image!}
        height={40}
        width={40}
        alt="dp"
        onClick={() => signOut()}
      />
    </div>
  );
};

export default Navbar;
