// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    revalidated: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    try {
        await res.revalidate("/produk/static");
        return res.status(200).json({ revalidated: true });
    } catch (error) {
        console.error("Error in API route:", error);
        res.status(500).send({ revalidated: false });
    }
}