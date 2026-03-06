import useSWR from "swr";
import { normalizeProducts, ProductType } from "@/types/Product.type";
import fetcher from "./fetcher";

type ApiProductsResponse = {
  status: boolean;
  status_code: number;
  message?: string;
  data: ProductType[];
};

type UseProductsResult = {
  products: ProductType[];
  isLoading: boolean;
  errorMessage?: string;
};

const useProducts = (): UseProductsResult => {
  const { data, error, isLoading } = useSWR<ApiProductsResponse>("/api/produk", fetcher);
  const hasApiError = Boolean(error || (data && !data.status));
  const isPageLoading = isLoading && !data;

  if (hasApiError) {
    return {
      products: [],
      isLoading: false,
      errorMessage: "Gagal memuat data produk. Silakan coba lagi.",
    };
  }

  return {
    products: isPageLoading ? [] : normalizeProducts(data?.data),
    isLoading: isPageLoading,
  };
};

export default useProducts;
