"use client";

import Link from "next/link";
import { TbBugFilled } from "react-icons/tb";
import { NavLinks } from "./NavLinks";
import NavState from "./NavState";

const Navbar = () => {
  return (
    <nav className="flex border-b-2 mb-5 py-5 px-5 items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <TbBugFilled size={30} />
        </Link>
        <NavLinks />
      </div>

      <div>
        <NavState />
      </div>
    </nav>
  );
};

export default Navbar;
