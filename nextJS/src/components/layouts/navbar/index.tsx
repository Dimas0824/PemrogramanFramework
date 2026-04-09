import Script from "next/dist/client/script";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data }: any = useSession();
    const user = data?.user;
    const displayName = user?.fullname || user?.name || user?.email || "User";
    const avatarImage =
        typeof user?.image === "string" && user.image.trim().length > 0
            ? user.image
            : "";
    const avatarInitial = displayName.charAt(0).toUpperCase();
    //const { data: session } = useSession()
    // console.log("session", session)

    return (
        <div className={styles.Navbar}>
            <div className={styles.Navbar_brand}>
                MyApp
            </div>

            <div className={styles.Navbar_right} id="title">
                {data ? (
                    <>
                        <div className={styles.Navbar_user}>
                            <span className={styles.Navbar_user_text}>
                                Welcome, {displayName}
                            </span>
                            <span className={styles.Navbar_user_role}>
                                Role: {user?.role || "member"}
                            </span>
                        </div>
                        {avatarImage ? (
                            <Image
                                src={avatarImage}
                                alt={displayName}
                                width={42}
                                height={42}
                                className={styles.Navbar_user_image}
                                unoptimized={false}
                            />
                        ) : (
                            <div className={styles.Navbar_user_avatarFallback}>
                                {avatarInitial}
                            </div>
                        )}
                        <Link href="/profile" className={styles.Navbar_link}>
                            Profile
                        </Link>
                        {user?.role === "admin" && (
                            <Link href="/admin" className={styles.Navbar_link}>
                                Admin
                            </Link>
                        )}
                        {user?.role === "editor" && (
                            <Link href="/editor" className={styles.Navbar_link}>
                                Editor
                            </Link>
                        )}
                        <button
                            className={`${styles.Navbar_button} ${styles["Navbar_button--danger"]}`}
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button
                        className={`${styles.Navbar_button} ${styles["Navbar_button--primary"]}`}
                        onClick={() => signIn()}
                    >
                        Sign In
                    </button>
                )}
            </div>
            <Script id="title-script" strategy="lazyOnload">
                {`document.getElementById('title').innerText = document.title;`}
            </Script>
        </div>
    );
};

export default Navbar;
