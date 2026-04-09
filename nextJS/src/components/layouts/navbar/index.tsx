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

            <div className={styles.Navbar_right}>
                {data ? (
                    <>
                        <div className={styles.Navbar_user}>
                            Welcome, {displayName}
                        </div>
                        {avatarImage ? (
                            <img
                                src={avatarImage}
                                alt={displayName}
                                className={styles.Navbar_user_image}
                            />
                        ) : (
                            <div className={styles.Navbar_user_avatarFallback}>
                                {avatarInitial}
                            </div>
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
        </div>
    );
};

export default Navbar;