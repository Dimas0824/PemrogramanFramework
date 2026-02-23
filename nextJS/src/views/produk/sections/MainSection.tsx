type MainSectionProps = {
    onLogout: () => void;
};

const MainSection = ({ onLogout }: MainSectionProps) => {
    return (
        <section>
            <button
                onClick={onLogout}
                className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
                Logout ke Login
            </button>
        </section>
    );
};

export default MainSection;
