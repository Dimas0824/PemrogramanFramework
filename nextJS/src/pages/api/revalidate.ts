// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    revalidated: boolean;
    message?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if (req.query.data === "produk") {
        return res.status(200).json({
            revalidated: false,
            message: "Detail produk sekarang memakai SSR, jadi on-demand revalidation tidak diperlukan.",
        });
    }

    return res.json({
        revalidated: false,
        message: "Invalid query parameter. Expected 'data=produk'.",
    });
}
