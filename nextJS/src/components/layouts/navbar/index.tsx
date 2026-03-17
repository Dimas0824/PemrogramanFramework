import { signIn } from 'next-auth/react';
import styles from './navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.Navbar}>
            <div className='big'>
                Navbar
            </div>
            <button className={styles.SignInButton} onClick={() => signIn()}>Sign In</button>
        </div>
    )
}

export default Navbar;