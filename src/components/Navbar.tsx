import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 px-6 py-6 flex items-center justify-center pointer-events-none">
      {/* Center Pill Navigation */}
      <nav className="glass rounded-full p-2 pl-8 hidden md:flex items-center gap-8 text-sm font-medium text-stone-200 pointer-events-auto shadow-xl">
        <Link href="#tentang" className="hover:text-brand-primary transition-colors">
          Tentang Kami
        </Link>
        <Link href="#sejarah" className="hover:text-brand-primary transition-colors">
          Kisah Sejarah
        </Link>
        <Link href="#zodiak" className="hover:text-brand-primary transition-colors">
          Zodiak
        </Link>

        {/* CTA Button inside the pill */}
        <a 
          href="https://www.invitea.cards/templates?kategori=ucapan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-stone-900 hover:bg-stone-200 px-6 py-2 rounded-full font-bold transition-colors shadow-md ml-4"
        >
          Buat Ucapan
        </a>
      </nav>
    </header>
  );
}
