import { ResultCard } from "@/components/ResultCard";
import { DownloadButton } from "@/components/DownloadButton";
import { CtaInvitea } from "@/components/CtaInvitea";
import { getOnThisDay } from "@/services/wikipedia";
import { getZodiac, getShio } from "@/utils/astrology";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ date: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const [yearStr, monthStr, dayStr] = date.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return { title: 'Tanggal Tidak Valid' };
  }

  const dateObj = new Date(year, month - 1, day);
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return {
    title: `Fakta Menarik ${formattedDate} - Kisahtanggalku`,
    description: `Lihat peristiwa sejarah, tokoh terkenal, serta ramalan zodiak dan shio yang berkaitan dengan ${formattedDate}.`,
    openGraph: {
      title: `Ada apa di balik tanggal ${formattedDate}?`,
      description: `Temukan fakta sejarah menarik, zodiak, shio, dan tokoh dunia yang lahir pada ${formattedDate}.`,
      url: `https://kisahtanggalku.invitea.cards/tanggal-lahir/${date}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Ada apa di balik tanggal ${formattedDate}?`,
      description: `Temukan fakta sejarah menarik, zodiak, shio, dan tokoh dunia yang lahir pada ${formattedDate}.`,
    },
  };
}

export default async function DynamicResultPage({ params }: Props) {
  const { date } = await params;
  
  // Parse date string (format "YYYY-MM-DD")
  const [yearStr, monthStr, dayStr] = date.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // Fallback UI for invalid dates
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return (
      <main className="min-h-screen pt-28 flex items-center justify-center text-stone-900 bg-[#c1af8a]">
        <h1 className="text-2xl font-serif">Format Tanggal Tidak Valid</h1>
      </main>
    );
  }

  // Generate Astrology Data
  const zodiac = getZodiac(month, day);
  const shio = getShio(year);

  // Fetch Wikipedia Data
  const data = await getOnThisDay(month, day, year);

  return (
    <main 
      className="min-h-screen pt-28 pb-12 px-4 relative overflow-hidden text-stone-900"
      style={{
        backgroundColor: "#c1af8a",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E"), radial-gradient(circle at center, transparent 30%, rgba(100,70,40,0.1) 100%)`
      }}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
        
        {/* Left Side: The Card */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <ResultCard 
              dateStr={date}
              events={data.events}
              zodiac={zodiac}
              shio={shio}
              famousPeople={data.births}
              holidays={data.holidays}
            />
          </div>
        </div>
        
        {/* Right Side: Actions & Copywriting */}
        <div className="w-full lg:w-[45%] flex flex-col gap-8 px-4 lg:pt-12 max-w-lg mx-auto lg:mx-0">
          
          <div className="text-center lg:text-left space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
              Arsip Sejarahmu <br className="hidden lg:block"/> Telah Terhimpun.
            </h2>
            <p className="font-serif text-stone-700 text-lg leading-relaxed">
              Ternyata hari kelahiranmu menyimpan rangkaian peristiwa menakjubkan di masa lampau. Simpan lembaran sejarah ini sebagai kenang-kenangan, atau cetak menjadi ucapan digital yang berkesan.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <DownloadButton />

            <div className="mt-10 text-left bg-[#e8e2cd]/50 border border-stone-800/20 p-6 shadow-sm relative">
              <h3 className="font-serif font-bold text-stone-900 text-lg mb-3">
                Tanggal lahir orang spesial?
              </h3>
              <p className="font-serif text-stone-700 leading-relaxed mb-5 text-sm">
                Tanggal ini menyimpan banyak cerita sejarah. Kenapa tidak mengabadikannya sebagai kartu ucapan digital?
              </p>
              
              <div className="mb-6">
                <p className="font-serif text-stone-800 font-medium mb-2 text-sm">
                  Dengan Invitea, kamu bisa membuat kartu digital berisi:
                </p>
                <ul className="list-disc list-inside font-serif text-stone-700 text-sm space-y-1.5 ml-1">
                  <li>Tanggal lahir</li>
                  <li>Fakta-fakta menarik hari kelahiran</li>
                  <li>Foto</li>
                  <li>Ucapan pribadi</li>
                  <li>Musik favorit</li>
                  <li>Link yang bisa langsung dibagikan</li>
                </ul>
              </div>

              <CtaInvitea text="Buat Sekarang" className="w-full text-base sm:text-lg" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
