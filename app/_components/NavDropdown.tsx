import Link from "next/link";
import React from "react";

interface Props {
  avatar: string;
}

const NavDropdown = ({ avatar }: Props) => {
  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-circle m-1">
        <img src={avatar} alt="avatar" width={30} height={30} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-base-300"
      >
        <li>
          <Link href="/api/auth/signout">Log Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavDropdown;
