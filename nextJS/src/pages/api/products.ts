import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts } from "../../utils/db/servicefirebase";

type ProductItem = {
  id: string;
  name: string;
  category: string;
  image?: string;
  price: number;
};

type SuccessResponse = {
  status: true;
  status_code: number;
  data: ProductItem[];
};

type ErrorResponse = {
  status: false;
  status_code: number;
  message: string;
  data: [];
};

type ApiResponse = SuccessResponse | ErrorResponse;

const parsePrice = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      status: false,
      status_code: 405,
      message: "Method Not Allowed",
      data: [],
    });
  }

  try {
    const rawProducts = await retrieveProducts("products");

    const data: ProductItem[] = (rawProducts as Record<string, unknown>[])
      .map((item) => ({
        id: String(item.id ?? ""),
        name: String(item.name ?? ""),
        category: String(item.category ?? ""),
        image: typeof item.image === "string" ? item.image : undefined,
        price: parsePrice(item.price),
      }))
      .filter((item) => item.id && item.name);

    return res.status(200).json({
      status: true,
      status_code: 200,
      data,
    });
  } catch (error) {
    console.error("Error fetching /api/products:", error);
    return res.status(500).json({
      status: false,
      status_code: 500,
      message: "Internal Server Error",
      data: [],
    });
  }
}
