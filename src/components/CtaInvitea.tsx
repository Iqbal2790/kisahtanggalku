import { ArrowRight } from "lucide-react";

interface CtaInviteaProps {
  className?: string;
  text?: string;
}

export function CtaInvitea({ className = "", text = "Buat Sekarang" }: CtaInviteaProps) {
  return (
    <a 
      href="https://www.invitea.cards/templates?kategori=ucapan"
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-[#8a3c26] text-[#f0ebd8] border-2 border-stone-900 shadow-[4px_4px_0px_#1c1917] hover:shadow-[6px_6px_0px_#1c1917] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-[0px_0px_0px_#1c1917] active:translate-y-1 active:translate-x-1 transition-all duration-150 ease-out overflow-hidden ${className}`}
    >
      {/* Inner dashed stamp line */}
      <div className="absolute inset-0 border-[2px] border-dashed border-[#f0ebd8]/40 m-1 pointer-events-none" />
      
      <span className="relative z-10 text-lg sm:text-xl tracking-[0.15em] uppercase font-serif font-black drop-shadow-sm">{text}</span>
      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-150 ease-out" />
    </a>
  );
}
