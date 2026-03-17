import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data }: any = useSession();
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
                            Welcome, {data.user?.fullname}
                        </div>
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