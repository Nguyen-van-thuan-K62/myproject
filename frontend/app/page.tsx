'use client';

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Dữ liệu sản phẩm (cho phần cuộn ngang)
  const premiumProducts = [
    { id: 1, name: "VISION PRO", price: "$3,499", img: "https://images.unsplash.com/photo-1629739884942-87f54c935b84?q=80&w=800" },
    { id: 2, name: "MACBOOK PRO", price: "$1,599", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800" },
    { id: 3, name: "IPHONE 15 MAX", price: "$1,199", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800" },
    { id: 4, name: "PLAYSTATION 6", price: "$599", img: "https://images.unsplash.com/photo-1606144042614-b0a562e54830?q=80&w=800" },
    { id: 5, name: "XBOX SERIES Z", price: "$499", img: "https://images.unsplash.com/photo-1612832021088-9c1b0e7a2c3e?q=80&w=800" },
  ];

  useGSAP(() => {
    // 1. Hero Text Reveal (Chữ hiện lên ngầu lòi)
    gsap.from(".hero-title span", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.5
    });

    gsap.to(".hero-img", {
      y: -50,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1 // Chuyển động theo cuộn chuột
      }
    });

    // 2. HORIZONTAL SCROLL (Kỹ thuật Pinning - Cuộn ngang)
    const sections = gsap.utils.toArray<HTMLElement>(".horizontal-item");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1), // Trượt ngang theo số card
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-scroll-wrapper",
        start: "top top",          // Khi section chạm đỉnh màn hình
        pin: true,                 // Ghim section lại
        scrub: 1,                  // Scroll tới đâu chạy tới đó (mượt 1s)
        snap: 1 / (sections.length - 1), // Snap từng card
        anticipatePin: 1,          // Giảm giật khi bắt đầu pin
        
        // ✅ Dynamic scroll distance (chuẩn hơn 3000)
        end: () =>
          "+=" + window.innerWidth * (sections.length - 1),
      }
    });

    // 3. Text Highlight Animation
    gsap.utils.toArray(".highlight-text").forEach((text: any) => {
      gsap.to(text, {
        backgroundSize: "100% 100%",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen overflow-x-hidden font-sans selection:bg-purple-500 selection:text-white">
      
      {/* 1. CINEMATIC HERO */}
      <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/4 left-1/4 w-100 h-100 bg-blue-600/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10 text-center mix-blend-difference">
          <h1 className="hero-title text-[10vw] font-black leading-none tracking-tighter">
            <span className="inline-block">THE</span> <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">NEXT</span> <br/>
            <span className="inline-block">GENERATION</span>
          </h1>
          <p className="mt-8 text-xl text-gray-400 max-w-lg mx-auto font-light tracking-wide">
            Không chỉ là công nghệ. Đó là phong cách sống của tương lai.
          </p>
        </div>
        
        {/* Floating Image Parallax */}
        <Image 
          src="https://images.unsplash.com/photo-1611186871348-d1a635561729?q=80&w=1200" 
          alt="Hero Device" 
          width={800}
          height={600}
          className="hero-img absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] md:w-[40%] opacity-80 z-0 drop-shadow-[0_0_50px_rgba(100,100,255,0.3)]"
        />
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="text-gray-500 text-xs tracking-[0.3em] uppercase">Scroll Down</span>
        </div>
      </section>

      {/* 2. TEXT REVEAL SECTION */}
      <section className="py-32 container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
          Chúng tôi kiến tạo 
          <span className="highlight-text bg-linear-to-r from-blue-600 to-purple-600 bg-no-repeat bg-size-[0%_100%] bg-bottom-left text-transparent bg-clip-text transition-[background-size]"> những trải nghiệm </span>
           vượt qua giới hạn của 
           <span className="highlight-text bg-linear-to-r from-purple-600 to-pink-600 bg-no-repeat bg-size-[0%_100%] bg-bottom-left text-transparent bg-clip-text transition-[background-size]"> vật lý và kỹ thuật số.</span>
        </h2>
      </section>

      {/* 3. HORIZONTAL SCROLL SHOWCASE (Điểm nhấn chính) */}
      <section className="horizontal-scroll-wrapper h-screen bg-zinc-950 flex items-center overflow-hidden relative">
        <div className="absolute top-10 left-10 z-20">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Bộ sưu tập 2026</h3>
          <h2 className="text-3xl font-bold text-white mt-2">Dòng sản phẩm Elite</h2>
        </div>

        {/* Container chứa các card chạy ngang */}
        <div className="flex w-[400%] h-[70vh] pl-10 md:pl-20 gap-10 md:gap-20 items-center">
          {premiumProducts.map((prod, index) => (
            <div key={index} className="horizontal-item w-screen md:w-[80vw] h-full shrink-0 relative group cursor-pointer">
              {/* Ảnh nền */}
              <div className="w-full h-full overflow-hidden rounded-[3rem] relative">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                <Image src={prod.img} alt={prod.name} fill className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                
                {/* Text nổi trên ảnh */}
                <div className="absolute bottom-10 left-10 z-20 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <h3 className="text-6xl md:text-8xl font-black text-white/90">{prod.name}</h3>
                  <p className="text-2xl text-blue-400 font-mono mt-2">{prod.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DARK BENTO GRID */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-200">
        {/* Card Lớn */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <Image src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000" alt="Gaming" fill className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-3xl font-bold mb-2">Gaming Ecosystem</h3>
              <p className="text-gray-400 max-w-md">Đắm chìm trong thế giới ảo với hiệu năng xử lý không giới hạn.</p>
            </div>
          </div>

          {/* Card Nhỏ 1 */}
          <div className="relative rounded-3xl overflow-hidden group border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-8 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl mb-4">⚡</div>
            <div>
              <h3 className="text-2xl font-bold text-white">Sạc siêu tốc</h3>
              <p className="text-gray-400 text-sm mt-2">100% pin chỉ trong 15 phút. Công nghệ GaN thế hệ mới.</p>
            </div>
          </div>

          {/* Card Nhỏ 2 */}
          <div className="relative rounded-3xl overflow-hidden group border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-8 flex flex-col justify-between hover:border-purple-500/50 transition-colors">
             <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-3xl mb-4">🛡️</div>
            <div>
              <h3 className="text-2xl font-bold text-white">Bảo mật lượng tử</h3>
              <p className="text-gray-400 text-sm mt-2">Chip mã hóa riêng biệt, không thể xâm nhập.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MINIMALIST FOOTER CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-blue-600 to-purple-600 rounded-full blur-[150px] opacity-20 -z-10"></div>
        
        <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to upgrade?</h2>
        <Link href="/san-pham" className="inline-block px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-110 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          Khám phá ngay
        </Link>
      </section>

    </div>
  );
}