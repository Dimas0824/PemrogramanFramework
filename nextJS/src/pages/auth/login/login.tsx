import { useRouter } from "next/router";
import TampilanLogin from ".";

const HalamanLogin = () => {
    const { push } = useRouter();
    return (
        <>
            <TampilanLogin />
        </>
    )
}

export default HalamanLogin;
