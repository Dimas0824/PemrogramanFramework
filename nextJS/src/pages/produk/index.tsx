import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TampilanProduk from '../../views/product';
import useSWR from 'swr';
import fetcher from '../../utils/swr/fetcher';
import type { ProductType } from '@/types/Product.type';

type ApiProductsResponse = {
    status: boolean;
    status_code: number;
    message?: string;
    data: ProductType[];
};

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const kategori = () => {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const [products, setProducts] = useState([]);

    // console.log("products:", products);

    const { data, error, isLoading } = useSWR<ApiProductsResponse>('/api/produk', fetcher);

    // cek apakah data, error, dan isLoading sudah benar ...

    return (
        <div>
            <TampilanProduk products={isLoading ? [] : data?.data ?? []} />
        </div>
    );
};

export default kategori;
