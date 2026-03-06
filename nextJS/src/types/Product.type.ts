export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type ProductInput = Partial<{
  id: unknown;
  name: unknown;
  price: unknown;
  image: unknown;
  category: unknown;
}> | null | undefined;

const toSafeString = (value: unknown): string => {
  return typeof value === "string" ? value : "";
};

const toSafeNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const normalizeProduct = (product: ProductInput): ProductType => {
  return {
    id: toSafeString(product?.id),
    name: toSafeString(product?.name),
    price: toSafeNumber(product?.price),
    image: toSafeString(product?.image),
    category: toSafeString(product?.category),
  };
};

export const normalizeProducts = (products: unknown): ProductType[] => {
  if (!Array.isArray(products)) return [];
  return products.map((product) => normalizeProduct(product as ProductInput));
};
