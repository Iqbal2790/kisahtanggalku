"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { toPng } from "html-to-image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { 
  TbZodiacAries, TbZodiacTaurus, TbZodiacGemini, TbZodiacCancer, 
  TbZodiacLeo, TbZodiacVirgo, TbZodiacLibra, TbZodiacScorpio, 
  TbZodiacSagittarius, TbZodiacCapricorn, TbZodiacAquarius, TbZodiacPisces 
} from "react-icons/tb";
import { 
  GiMouse, GiCow, GiTigerHead, GiRabbit, GiDragonHead, GiSnake, 
  GiHorseHead, GiGoat, GiMonkey, GiRooster, GiWolfHead, GiPig 
} from "react-icons/gi";
import { HistoricalEvent } from "@/services/wikipedia";
import { Mail } from "lucide-react";

interface ResultCardProps {
  dateStr: string; // e.g. "1945-08-17"
  events?: HistoricalEvent[];
  zodiac?: { name: string; trait: string };
  shio?: { name: string; element: string };
  famousPeople?: { name: string; description: string; year?: number }[];
  holidays?: string[];
}

export function ResultCard({ 
  dateStr, 
  events = [],
  zodiac = { name: "Leo", trait: "Karismatik & Berani" },
  shio = { name: "Ayam", element: "Kayu" },
  famousPeople = [
    { name: "Robert De Niro", description: "Aktor, sutradara, produser" },
    { name: "Sean Penn", description: "Aktor dan sutradara" },
  ],
  holidays = []
}: ResultCardProps) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  
  const formattedDate = format(dateObj, "dd MMMM yyyy", { locale: id });
  const formattedDay = format(dateObj, "EEEE", { locale: id });
  
  const births = famousPeople;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      // Wait for React to apply isDownloading=true to hide button and show watermark
      // Also wait a bit longer for fonts to potentially load if they were just injected
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2, // High resolution
        cacheBust: true, // Prevent caching issues with fonts/images
      });
      
      // Deteksi Web Share API (sangat berguna untuk iOS/Safari)
      if (navigator.share) {
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], `kisahtanggalku-${dateStr}.png`, { type: blob.type });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: "Kisahtanggalku",
              text: "Lihat kisah di balik tanggal lahirku!"
            });
            window.dispatchEvent(new CustomEvent("download-complete"));
            return;
          }
        } catch (shareErr) {
          console.log("Membatalkan share atau share tidak didukung", shareErr);
        }
      }
      
      const link = document.createElement("a");
      link.download = `kisahtanggalku-${dateStr}.png`;
      link.href = dataUrl;
      link.click();
      window.dispatchEvent(new CustomEvent("download-complete"));
    } catch (err) {
      console.error("Gagal mengunduh gambar:", err);
      window.dispatchEvent(new CustomEvent("download-error"));
      alert("Maaf, terjadi kesalahan saat menyimpan gambar.");
    } finally {
      setIsDownloading(false);
    }
  }, [dateStr]);

  useEffect(() => {
    const onTrigger = () => {
      handleDownload();
    };
    window.addEventListener("trigger-download", onTrigger);
    return () => window.removeEventListener("trigger-download", onTrigger);
  }, [handleDownload]);

  return (
    <div 
      ref={cardRef}
      className={`w-full max-w-sm sm:max-w-md mx-auto relative p-3 md:p-4 shadow-2xl transition-all flex flex-col ${isDownloading ? "aspect-[9/16] overflow-hidden pb-8 md:pb-10" : ""}`}
      style={{ backgroundColor: "#e6ddc5" }} // Vintage paper base color
    >
      {/* Inject fonts directly so html-to-image can parse them */}
      {isDownloading && (
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Fredoka:wght@400..700&display=swap');
          :root, div, span, p, h1, h2, h3, h4 {
            --font-caveat: 'Caveat', cursive !important;
            --font-fredoka: 'Fredoka', sans-serif !important;
          }
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        `}} />
      )}

      {/* Heavy Noise / Paper Texture (Inline SVG for better html-to-image support) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Darkened edges for burnt/old paper effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(100,70,40,0.15)] pointer-events-none"></div>

      {/* Inner Postcard Border */}
      <div className={`border border-dashed border-stone-800/40 p-5 md:p-7 relative z-10 text-stone-800 bg-[#e8e0ca]/50 flex-1 flex flex-col ${isDownloading ? "overflow-hidden" : ""}`}>
        
        {/* Top Header - Postcard Marks */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <span className="font-serif text-[10px] tracking-[0.3em] font-bold text-stone-800/60 uppercase border-b border-stone-800/20 pb-1">
              Kisah Tanggalku
            </span>
            <span className="font-serif text-[8px] tracking-[0.2em] uppercase mt-1 text-stone-800/40">
              Historical Archive
            </span>
          </div>
          
          {/* Fake Stamps */}
          <div className="relative flex gap-2">
            {/* Wavy Cancel Lines */}
            <div className="absolute -left-12 top-2 opacity-30 flex flex-col gap-1 w-12 overflow-hidden -rotate-6">
               <div className="h-0.5 w-full bg-stone-800/80 rounded-full"></div>
               <div className="h-0.5 w-full bg-stone-800/80 rounded-full"></div>
               <div className="h-0.5 w-full bg-stone-800/80 rounded-full"></div>
            </div>
            
            {/* Circular Stamp */}
            <div className="w-12 h-12 rounded-full border-2 border-stone-800/40 absolute -left-6 -top-2 flex items-center justify-center rotate-12 opacity-50 mix-blend-multiply">
              <span className="text-[6px] uppercase tracking-widest text-center font-bold font-serif leading-tight">
                {formattedDay} <br/> {year}
              </span>
            </div>
            
            {/* Postage Stamp */}
            <div className="w-12 h-14 bg-[#f0ebd8] border border-stone-800/20 p-1 flex items-center justify-center rotate-3 shadow-sm relative">
               <div className="absolute -inset-0.5 border-[3px] border-dashed border-[#e6ddc5]"></div>
               <Mail className="w-6 h-6 text-stone-800/40" />
            </div>
          </div>
        </div>

        {/* Big Date */}
        <div className="text-center mb-8 relative">
          <h1 className="text-5xl md:text-6xl font-caveat text-stone-900 leading-none mb-1 -rotate-2">
            {formattedDate}
          </h1>
          <p className="font-serif italic text-stone-600 text-sm">
            Telah tercatat dalam lembar sejarah.
          </p>
        </div>

        {/* Astrology Badges (Vintage Style) */}
        <div className="flex border-y border-stone-800/20 mb-8 divide-x divide-stone-800/20">
          <div className="flex-1 py-4 flex flex-col items-center">
            {(() => {
              const iconMap: Record<string, React.ElementType> = {
                "Aries": TbZodiacAries, "Taurus": TbZodiacTaurus, "Gemini": TbZodiacGemini,
                "Cancer": TbZodiacCancer, "Leo": TbZodiacLeo, "Virgo": TbZodiacVirgo,
                "Libra": TbZodiacLibra, "Scorpio": TbZodiacScorpio, "Sagittarius": TbZodiacSagittarius,
                "Capricorn": TbZodiacCapricorn, "Aquarius": TbZodiacAquarius, "Pisces": TbZodiacPisces
              };
              const Icon = iconMap[zodiac.name] || TbZodiacLeo;
              return <Icon className="w-8 h-8 text-stone-700 mb-2 opacity-80" strokeWidth={1.5} />;
            })()}
            <h3 className="font-serif font-bold text-stone-900 tracking-widest uppercase text-xs mb-1">{zodiac.name}</h3>
            <p className="text-[9px] text-stone-600 font-medium uppercase tracking-wider">{zodiac.trait}</p>
          </div>
          <div className="flex-1 py-4 flex flex-col items-center">
            {(() => {
              const iconMap: Record<string, React.ElementType> = {
                "Tikus": GiMouse, "Kerbau": GiCow, "Macan": GiTigerHead, "Kelinci": GiRabbit,
                "Naga": GiDragonHead, "Ular": GiSnake, "Kuda": GiHorseHead, "Kambing": GiGoat,
                "Monyet": GiMonkey, "Ayam": GiRooster, "Anjing": GiWolfHead, "Babi": GiPig
              };
              const Icon = iconMap[shio.name] || GiRooster;
              return <Icon className="w-8 h-8 text-stone-700 mb-2 opacity-80" />;
            })()}
            <h3 className="font-serif font-bold text-stone-900 tracking-widest uppercase text-xs mb-1">Shio {shio.name}</h3>
            <p className="text-[9px] text-stone-600 font-medium uppercase tracking-wider">Elemen {shio.element}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          
          {/* Holidays */}
          {holidays.length > 0 && (
            <section className="mb-4">
              <h3 className="font-serif font-bold text-[10px] tracking-widest uppercase border-b border-stone-800/20 pb-2 mb-3">
                Hari Peringatan
              </h3>
              <ul className="space-y-3">
                {(isDownloading ? holidays.slice(0, 1) : holidays).map((holiday, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-stone-500 mt-0.5 text-xs">✺</span>
                    <span className={`font-serif text-[13px] leading-snug ${isDownloading ? "line-clamp-2" : ""}`}>{holiday}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Sejarah */}
          {events.length > 0 && (
            <section className="mb-4">
              <h3 className="font-serif font-bold text-[10px] tracking-widest uppercase border-b border-stone-800/20 pb-2 mb-3">
                Jejak Peristiwa
              </h3>
              <div className="space-y-4">
                {(isDownloading 
                  ? (events.length > 0 ? [events.reduce((prev, curr) => Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev)] : [])
                  : events).map((event: HistoricalEvent, i: number) => (
                  <div key={i} className="flex flex-col border-b border-stone-800/10 pb-3 last:border-0 last:pb-0">
                    <span className="font-bold font-serif text-[12px]">{event.year}</span>
                    <p className={`font-serif text-stone-700 text-[13px] leading-tight mt-1 ${isDownloading ? "line-clamp-3" : ""}`}>{event.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tokoh */}
          {births.length > 0 && (
            <section>
              <h3 className="font-serif font-bold text-[10px] tracking-widest uppercase border-b border-stone-800/20 pb-2 mb-3">
                Tokoh Lahir
              </h3>
              <div className="space-y-3">
                {(isDownloading ? births.slice(0, 1) : births).map((person, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-bold font-serif text-[12px]">{person.year} - {person.name}</span>
                    <p className={`font-serif text-stone-600 text-[11px] leading-tight mt-0.5 ${isDownloading ? "line-clamp-2" : ""}`}>{person.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

      </div>
      
      {/* Watermark Invitea (Hanya muncul saat download) */}
      {isDownloading && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-70">
          <p className="font-serif text-[10px] tracking-widest uppercase text-stone-700">
            Dibuat di invitea.cards
          </p>
        </div>
      )}
    </div>
  );
}
