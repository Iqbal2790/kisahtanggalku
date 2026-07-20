import { unstable_cache } from 'next/cache';

export interface HistoricalEvent {
  year: number;
  text: string;
}

export interface FamousPerson {
  name: string;
  description: string;
  year: number;
}

export interface OnThisDayData {
  events: HistoricalEvent[];
  births: FamousPerson[];
  holidays: string[];
}

const fetchAndShrinkWikiData = unstable_cache(
  async (mm: string, dd: string) => {
    const endpoint = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${mm}/${dd}`;
    try {
      const response = await fetch(endpoint, {
        headers: {
          "User-Agent": "Kisahtanggalku/1.0 (contact@invitea.cards)",
          "Accept": "application/json",
          "Accept-Language": "id,en;q=0.9"
        },
        cache: 'no-store' // Nonaktifkan fetch cache bawaan agar tidak terkena limit 2MB
      });

      if (!response.ok) {
        console.error(`Wikipedia API Error: ${response.status} ${response.statusText}`);
        return { events: [], births: [], holidays: [] };
      }

      const data = await response.json();
      
      // Ambil dan bersihkan data sebelum masuk cache Next.js
      return {
        events: (data.events || []).map((ev: { year: number, text: string }) => ({
          year: ev.year,
          text: ev.text
        })),
        births: (data.births || []).map((b: { year: number, text: string, pages?: { title?: string, description?: string }[] }) => {
          const page = b.pages && b.pages.length > 0 ? b.pages[0] : null;
          let rawName = page?.title || b.text.split(',')[0];
          let rawDesc = page?.description || "Tokoh Berpengaruh";
          
          rawName = rawName.replace(/_/g, ' ');
          rawDesc = rawDesc.replace(/\s*\(born \d{4}\)/i, '');
          
          return {
            name: rawName,
            description: rawDesc,
            year: b.year
          };
        }),
        holidays: (data.holidays || []).map((h: { text: string }) => h.text)
      };
    } catch (error) {
      console.error("Gagal mengambil data dari Wikipedia API:", error);
      return { events: [], births: [], holidays: [] };
    }
  },
  ['wikipedia-onthisday-v2'], // Cache key
  { revalidate: 86400 } // Cache per 24 jam (86400 detik)
);

/**
 * Mengambil data peristiwa sejarah, kelahiran, dan hari peringatan dari Wikimedia API.
 * @param month Bulan lahir (1-12)
 * @param day Tanggal lahir (1-31)
 * @param year (Opsional) Tahun lahir untuk memprioritaskan tokoh yang lahir di tahun yang sama
 */
export async function getOnThisDay(month: number, day: number, year?: number): Promise<OnThisDayData> {
  const mm = month.toString().padStart(2, '0');
  const dd = day.toString().padStart(2, '0');
  
  const shrunkData = await fetchAndShrinkWikiData(mm, dd);

  // Proses events (maksimal 5)
  const events = shrunkData.events.slice(0, 5);

  // Proses births (maksimal 3, hanya di tahun yang sama)
  let exactYearBirths: FamousPerson[] = [];
  if (year) {
    exactYearBirths = shrunkData.births.filter((b: FamousPerson) => b.year === year);
  }
  const births = exactYearBirths.slice(0, 3);

  // Proses holidays (maksimal 3)
  const holidays = shrunkData.holidays.slice(0, 3);

  return { events, births, holidays };
}

export async function getHistoricalEvents(month: number, day: number): Promise<HistoricalEvent[]> {
  const data = await getOnThisDay(month, day);
  return data.events;
}
