import HeroSection from "./sections/HeroSection";
import MainSection from "./sections/MainSection";

type ProdukViewProps = {
    onLogout: () => void;
};

const ProdukView = ({ onLogout }: ProdukViewProps) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                <HeroSection />
                <MainSection onLogout={onLogout} />
            </div>
        </div>
    );
};

export default ProdukView;
