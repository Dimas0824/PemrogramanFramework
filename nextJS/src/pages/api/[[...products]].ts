// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  retrieveDataByID,
  retrieveProducts,
} from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const slug = req.query.products;
    const productId = Array.isArray(slug)
      ? slug[slug.length - 1]
      : typeof slug === "string"
        ? slug
        : undefined;

    if (productId) {
      const data = await retrieveDataByID("products", productId);
      res.status(200).json({ status: true, status_code: 200, data });
      return;
    } else {
      const data = await retrieveProducts("products");
      res.status(200).json({ status: true, status_code: 200, data });
      return;
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      status_code: 500,
      data: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
