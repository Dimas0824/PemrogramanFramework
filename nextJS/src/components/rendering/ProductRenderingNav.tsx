import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ProductRenderingNav.module.css";

const links = [
  { href: "/rendering/produk/csr", label: "Produk CSR" },
  { href: "/rendering/produk/ssr", label: "Produk SSR" },
  { href: "/rendering/produk/ssg", label: "Produk SSG" },
];

const ProductRenderingNav = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav} aria-label="Navigasi rendering produk">
      {links.map((link) => {
        const isActive = router.asPath === link.href || router.asPath.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${isActive ? styles.active : ""}`.trim()}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default ProductRenderingNav;
