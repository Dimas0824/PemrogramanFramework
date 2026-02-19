import Navbar from "../navbar";

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
    <div className="min-h-screen flex flex-col bg-white text-black">
        <Navbar />
        <main className="flex-1">
            {children}
        </main>
        <footer className="mt-4 bg-gray-900 text-white text-center py-6 mb-5 h-10">
            <p className="text-sm">Praktikum Next.js Layout — Footer muncul di semua halaman</p>
        </footer>
    </div>
)

export default AppShell;