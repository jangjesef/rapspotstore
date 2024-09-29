import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto">
          <Link href="/" className="text-xl font-bold">
            Můj Blog
          </Link>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          © 2023 Můj Blog. Všechna práva vyhrazena.
        </div>
      </footer>
    </div>
  );
}
