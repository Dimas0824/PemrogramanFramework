import { NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    ["/profile", "/profile/edit"]
);

export const config = {
    matcher: ["/profile", "/profile/edit"],
};
