import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  retrieveUsers,
  updateUserRole,
  UserRole,
} from "@/utils/db/servicefirebase";

type RoleApiResponse =
  | {
      message: string;
    }
  | {
      data: Awaited<ReturnType<typeof retrieveUsers>>;
    };

const allowedRoles: UserRole[] = ["member", "editor", "admin"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoleApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!["editor", "admin"].includes(session.user.role || "")) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (req.method === "GET") {
    const users = await retrieveUsers();
    return res.status(200).json({ data: users });
  }

  if (req.method === "PATCH") {
    const { userId, role } = req.body as { userId?: string; role?: UserRole };

    if (!userId || !role || !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    await updateUserRole(userId, role);
    return res.status(200).json({ message: "Role updated successfully" });
  }

  res.setHeader("Allow", ["GET", "PATCH"]);
  return res.status(405).json({ message: "Method Not Allowed" });
}
