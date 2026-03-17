import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data } = useSession();
    //const { data: session } = useSession()
    // console.log("session", session)

    return (
        <div className={styles.Navbar}>
            <div className="big">
                Navbar
            </div>
            {data ? (
                <button className={styles.SignButton} onClick={() => signOut()}>
                    Sign Out
                </button>
            ) : (
                <button className={styles.SignButton} onClick={() => signIn()}>
                    Sign In
                </button>
            )}
        </div>
    );
};

export default Navbar;