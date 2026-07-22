"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DateForm() {
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      router.push(`/tanggal-lahir/${date}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md border border-white/30 p-1.5 sm:p-2 rounded-full flex items-center w-full max-w-lg mx-auto mt-12 transition-all hover:bg-white/20 hover:border-white/50 shadow-2xl"
    >
      <div className="flex-1 flex px-3 sm:px-6 min-w-0 text-white text-base sm:text-lg font-medium">
        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-transparent outline-none text-center placeholder:text-white/60 cursor-pointer min-w-0"
          style={{ colorScheme: "dark" }}
          aria-label="Tanggal Lahir"
          required
        />
      </div>
      <button 
        type="submit"
        className="bg-white text-stone-900 p-3 sm:p-4 rounded-full hover:bg-stone-200 transition-colors shadow-lg flex-shrink-0"
        aria-label="Cari"
      >
        <Search size={20} className="stroke-[3px] sm:w-[22px] sm:h-[22px]" />
      </button>
    </form>
  );
}
