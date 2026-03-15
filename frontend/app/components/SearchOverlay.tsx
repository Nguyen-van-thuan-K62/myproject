'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Hiện ra
      gsap.to(containerRef.current, { opacity: 1, visibility: "visible", duration: 0.3 });
      gsap.fromTo(".search-content", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 });
    } else {
      // Ẩn đi
      gsap.to(containerRef.current, { opacity: 0, visibility: "hidden", duration: 0.3 });
    }
  }, [isOpen]);

  // Mock search results
  const results = query.length > 0 ? [
    { name: "iPhone 15 Pro Max", cat: "Smartphone", price: "$1,199" },
    { name: "Sony WH-1000XM5", cat: "Audio", price: "$349" },
  ] : [];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-60 opacity-0 invisible flex flex-col pt-32 px-6 items-center"
    >
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="search-content w-full max-w-3xl">
        <h2 className="text-center text-gray-500 font-bold mb-6 text-sm uppercase tracking-widest">Tìm kiếm sản phẩm</h2>
        
        {/* Input */}
        <div className="relative border-b-2 border-zinc-800 focus-within:border-white transition-colors duration-500">
           <input 
             type="text" 
             placeholder="Nhập tên sản phẩm..." 
             className="w-full bg-transparent text-4xl md:text-6xl font-black text-white py-6 focus:outline-none placeholder-zinc-800 text-center"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             autoFocus
           />
        </div>

        {/* Results */}
        <div className="mt-12 space-y-4">
           {results.length > 0 && <p className="text-gray-500 mb-4 text-center">Kết quả tìm thấy:</p>}
           
           {results.map((item, idx) => (
             <Link href="/san-pham/1" key={idx} onClick={onClose} className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-800 transition group cursor-pointer">
               <div>
                 <h3 className="text-xl font-bold text-white group-hover:text-blue-500 transition">{item.name}</h3>
                 <p className="text-sm text-gray-500">{item.cat}</p>
               </div>
               <div className="text-xl font-bold text-white group-hover:translate-x-2 transition-transform">
                 {item.price} →
               </div>
             </Link>
           ))}

           {query.length > 0 && results.length === 0 && (
             <p className="text-center text-gray-600 text-lg">Không tìm thấy sản phẩm nào.</p>
           )}
        </div>
      </div>
    </div>
  );
}