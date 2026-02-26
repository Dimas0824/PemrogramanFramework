import TampilanProduk from "@/views/product";

const HalamanProdukServer = () => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilanProduk products={[]} isLoading />
    </div>
  )
}

export default HalamanProdukServer;
