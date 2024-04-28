import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  const pathName = usePathname();

  return (
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
  );
};
