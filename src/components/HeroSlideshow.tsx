"use client";

import { useEffect, useState } from "react";

const IMAGES = [
  "/images/Indonesia_declaration_of_independence_17_August_1945.jpg",
  "/images/069748500_1433859081-Aldrin_with_experiment.jpg",
  "/images/debut-construction-tour-eiffel-15-avril-1888.jpg",
  "/images/iwo-jima.webp",
  "/images/A42FJKKRNFCZLB6OQ4BG6H3QL4.jpg",
  "/images/5df7517799aea.jpg",
  "/images/344194884.webp",
  "/images/3159057916.jpg",
  "/images/2917288655.jpg",
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Memaksa browser (terutama Safari iOS) untuk men-download gambar di belakang layar
    // agar saat giliran slide-nya muncul, gambar sudah siap dan tidak blank.
    IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-brand-bg">
      {IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Historical photo ${index + 1}`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]" />
    </div>
  );
}
