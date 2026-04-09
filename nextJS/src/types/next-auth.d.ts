import { DefaultSession } from "next-auth";
import { AuthProviderType, UserRole } from "@/utils/db/servicefirebase";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            fullname?: string;
            role?: UserRole;
            type?: AuthProviderType;
            image?: string | null;
        };
    }

    interface User {
        fullname?: string;
        role?: UserRole;
        type?: AuthProviderType;
        image?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        fullname?: string;
        role?: UserRole;
        image?: string | null;
        type?: AuthProviderType;
    }
}
