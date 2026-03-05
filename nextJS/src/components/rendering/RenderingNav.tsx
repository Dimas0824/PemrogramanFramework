import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/rendering-pages.module.css";

const links = [
  { href: "/rendering/csr", label: "CSR" },
  { href: "/rendering/ssr", label: "SSR" },
  { href: "/rendering/ssg", label: "SSG" },
];

const RenderingNav = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav} aria-label="Navigasi metode rendering">
      {links.map((link) => {
        const isActive = router.pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`.trim()}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default RenderingNav;
