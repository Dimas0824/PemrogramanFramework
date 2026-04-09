import { useRouter } from "next/router";
import Navbar from "../navbar";

const disableNavbarRoutes = ["/login", "/auth/login", "/auth/register", "/404", "/_error"];

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const router = useRouter();
    const { pathname } = router;
    const shouldHideNavbar = disableNavbarRoutes.includes(pathname);

    return (
        <main>
            {!shouldHideNavbar && <Navbar />}
            {children}
        </main>
    )
}

export default AppShell;
