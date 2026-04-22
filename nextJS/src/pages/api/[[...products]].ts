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
      console.info("[ProductsApi] Detail request", {
        method: req.method,
        path: req.url,
        productId,
        hasData: Boolean(data),
      });
      res.setHeader("x-products-debug-type", "detail");
      res.setHeader("x-products-debug-id", productId);
      res.setHeader("x-products-debug-has-data", String(Boolean(data)));
      res.status(200).json({ status: true, status_code: 200, data });
      return;
    } else {
      const data = await retrieveProducts("products");
      console.info("[ProductsApi] List request", {
        method: req.method,
        path: req.url,
        count: Array.isArray(data) ? data.length : 0,
      });
      res.setHeader("x-products-debug-type", "list");
      res.setHeader(
        "x-products-debug-count",
        String(Array.isArray(data) ? data.length : 0),
      );
      res.status(200).json({ status: true, status_code: 200, data });
      return;
    }
  } catch (error) {
    console.error("[ProductsApi] Request failed", {
      method: req.method,
      path: req.url,
      query: req.query,
      error: error instanceof Error ? error.message : error,
    });
    res.setHeader("x-products-debug-type", "error");
    res.status(500).json({
      status: false,
      status_code: 500,
      data: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
