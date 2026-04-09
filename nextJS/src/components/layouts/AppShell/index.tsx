import { useRouter } from "next/router";
import Navbar from "../navbar";
import { Roboto } from "next/font/google";

const disableNavbarRoutes = ["/login", "/auth/login", "/auth/register", "/404", "/_error"];

type AppShellProps = {
    children: React.ReactNode;
}

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const router = useRouter();
    const { pathname } = router;
    const shouldHideNavbar = disableNavbarRoutes.includes(pathname);

    return (
        <main className={roboto.className}>
            {!shouldHideNavbar && <Navbar />}
            {children}
        </main>
    )
}

export default AppShell;
