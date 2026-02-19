import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
    alamat: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ name: "John Doe", alamat: "Jl. Malang No. 123" });
}