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
      className="bg-white/10 backdrop-blur-md border border-white/30 p-2 rounded-full flex items-center w-full max-w-lg mx-auto mt-12 transition-all hover:bg-white/20 hover:border-white/50 shadow-2xl"
    >
      <div className="flex-1 flex px-6 text-white text-lg font-medium">
        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-transparent outline-none text-center placeholder:text-white/60 cursor-pointer"
          style={{ colorScheme: "dark" }}
          required
        />
      </div>
      <button 
        type="submit"
        className="bg-white text-stone-900 p-4 rounded-full hover:bg-stone-200 transition-colors shadow-lg flex-shrink-0"
        aria-label="Cari"
      >
        <Search size={22} className="stroke-[3px]" />
      </button>
    </form>
  );
}
