import HeroSlideshow from "@/components/HeroSlideshow";
import Navbar from "@/components/Navbar";
import DateForm from "@/components/DateForm";
import { caveat } from "./layout";

export default function Home() {
  return (
    <div className="text-stone-200">
      <Navbar />
      <main className="min-h-screen relative flex items-center justify-center p-6">
        <HeroSlideshow />
        
        <div className="relative z-10 w-full max-w-4xl text-center space-y-6 mt-12">
          <h1 className={`text-7xl md:text-9xl ${caveat.className} text-white leading-[0.9] drop-shadow-md`}>
            Ada apa di balik <br />
            <span className="text-brand-primary">
              tanggal lahirmu?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Jelajahi peristiwa sejarah dunia, temukan zodiakmu, dan lihat siapa tokoh hebat yang lahir di hari yang sama.
          </p>
          
          <DateForm />
        </div>
      </main>

      {/* Seksi Tentang Kami */}
      <section id="tentang" className="py-24 px-6 bg-stone-900 border-t border-stone-800 scroll-mt-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Tentang Kisahtanggalku</h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full"></div>
          <p className="text-lg text-stone-400 leading-relaxed max-w-3xl mx-auto">
            Kisahtanggalku adalah perkakas web yang dipersembahkan oleh <a href="https://www.invitea.cards" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Invitea</a>. Misi kami sederhana: menyatukan momen kelahiranmu dengan mozaik peristiwa bersejarah yang mengubah dunia. Dari peluncuran satelit pertama hingga revolusi kemerdekaan, setiap hari memiliki cerita tersendiri.
          </p>
        </div>
      </section>

      {/* Seksi Kisah Sejarah */}
      <section id="sejarah" className="py-24 px-6 bg-stone-950 scroll-mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Menelusuri Kisah Sejarah</h2>
            <p className="text-lg text-stone-400 leading-relaxed">
              Tahukah kamu bahwa pada hari kamu lahir, dunia tidak sedang diam? Kisahtanggalku menelusuri lorong waktu untuk menyuguhkan rentetan peristiwa paling menggemparkan dan barisan tokoh inspiratif yang berbagi hari ulang tahun denganmu.
            </p>
            <ul className="space-y-4 text-stone-300">
              <li className="flex items-center gap-3">
                <span className="text-brand-primary text-xl">✦</span> Dikurasi dari catatan arsip sejarah terpercaya.
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-primary text-xl">✦</span> Menampilkan tokoh-tokoh lahir di tahun yang sama.
              </li>
            </ul>
          </div>
          <div className="flex-1 p-8 glass rounded-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className={`text-4xl ${caveat.className} text-white mb-4 relative z-10`}>Tahukah kamu?</h3>
            <p className="italic text-stone-300 relative z-10">&quot;Setiap orang adalah bagian dari sejarah. Mari kita cari tahu sejarah seperti apa yang menyambut hari pertamamu di bumi.&quot;</p>
          </div>
        </div>
      </section>

      {/* Seksi Zodiak */}
      <section id="zodiak" className="py-24 px-6 bg-stone-900 border-t border-stone-800 scroll-mt-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Karakter Bintang & Shio</h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full"></div>
          <p className="text-lg text-stone-400 leading-relaxed max-w-3xl mx-auto">
            Selain sejarah dunia, pelajari juga bagaimana konstelasi bintang menaungi kelahiranmu. Algoritma kami secara otomatis mengalkulasi Zodiak Barat (Astrologi) dan Shio (Astrologi Tiongkok) secara presisi, lalu menyajikannya di dalam satu kartu estetik yang siap dibagikan ke media sosial.
          </p>
          <div className="pt-8">
             <a href="#" className="bg-white text-stone-900 hover:bg-stone-200 px-8 py-3 rounded-full font-bold transition-colors shadow-lg inline-block">
               Coba Sekarang
             </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-stone-500 bg-stone-950 border-t border-stone-800">
        <p>&copy; {new Date().getFullYear()} Kisahtanggalku. Dibuat dengan sepenuh hati oleh <a href="https://www.invitea.cards" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Invitea</a>.</p>
      </footer>
    </div>
  );
}
