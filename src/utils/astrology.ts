export interface ZodiacInfo {
  name: string;
  trait: string;
}

export interface ShioInfo {
  name: string;
  element: string;
}

/**
 * Mendapatkan Zodiak berdasarkan bulan dan tanggal
 * @param month Bulan (1-12)
 * @param day Tanggal (1-31)
 */
export function getZodiac(month: number, day: number): ZodiacInfo {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: "Aries", trait: "Pemberani & Penuh Semangat" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: "Taurus", trait: "Sabar & Dapat Diandalkan" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: "Gemini", trait: "Adaptif & Komunikatif" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: "Cancer", trait: "Penyayang & Intuitif" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: "Leo", trait: "Karismatik & Percaya Diri" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: "Virgo", trait: "Analitis & Pekerja Keras" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: "Libra", trait: "Harmonis & Diplomatis" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: "Scorpio", trait: "Intens & Penuh Gairah" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: "Sagittarius", trait: "Optimis & Berjiwa Petualang" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: "Capricorn", trait: "Disiplin & Ambisius" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: "Aquarius", trait: "Inovatif & Independen" };
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return { name: "Pisces", trait: "Empatis & Artistik" };
  
  return { name: "Unknown", trait: "Misterius" };
}

/**
 * Mendapatkan Shio berdasarkan tahun kelahiran (Perhitungan Sederhana berbasis Tahun Masehi)
 * @param year Tahun Kelahiran (e.g., 2000)
 */
export function getShio(year: number): ShioInfo {
  const shioAnimals = [
    "Tikus", "Kerbau", "Macan", "Kelinci", 
    "Naga", "Ular", "Kuda", "Kambing", 
    "Monyet", "Ayam", "Anjing", "Babi"
  ];
  
  const elements = ["Logam", "Air", "Kayu", "Api", "Tanah"];
  
  // Perhitungan Shio: Tahun 1900 adalah tahun Tikus. (1900 - 4) % 12 = 0
  const animalIndex = (year - 4) % 12;
  const animalName = shioAnimals[animalIndex >= 0 ? animalIndex : 12 + animalIndex];
  
  // Perhitungan Elemen berdasarkan angka terakhir dari tahun kelahiran
  const lastDigit = year % 10;
  const elementIndex = Math.floor(lastDigit / 2);
  const elementName = elements[elementIndex];
  
  return {
    name: animalName,
    element: elementName
  };
}
