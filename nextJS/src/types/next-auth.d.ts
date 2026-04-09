import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            fullname?: string;
            role?: string;
        };
    }

    interface User {
        fullname?: string;
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        fullname?: string;
        role?: string;
    }
}
