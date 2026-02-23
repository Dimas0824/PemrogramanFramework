import { useRouter } from "next/router";
import Navbar from "../navbar";

const disblenavbar = ["/auth/login", "/auth/register"];

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const router = useRouter();
    const { pathname } = router;

    return (
        <main>
            {!disblenavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    )
}

export default AppShell;