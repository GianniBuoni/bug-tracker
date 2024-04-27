"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TbBugFilled } from "react-icons/tb";
import NavDropdown from "./NavDropdown";

const Navbar = () => {
  const pathName = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex border-b-2 mb-5 py-5 px-5 items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <TbBugFilled size={30} />
        </Link>
        <ul className="flex gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  link.href === pathName
                    ? "text-secondary transition-colors"
                    : "text-primary transition-colors"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {status === "authenticated" && (
          <NavDropdown avatar={session.user!.image!} />
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin" className="btn m-1">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
