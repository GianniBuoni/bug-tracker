"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TbBugFilled } from "react-icons/tb";

const Navbar = () => {
  const pathName = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <div className="flex border-b-2 mb-5 py-5 pl-5 gap-3 items-center">
      <Link href="/">
        <TbBugFilled size={30} />
      </Link>
      <ul className="flex gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={
                link.href === pathName
                  ? "text-secondary transition-colors"
                  : "text-primary transition-colors"
              }
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
