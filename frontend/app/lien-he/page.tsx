'use client';

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State cho FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSent, setIsSent] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  const faqs = [
    { q: "Thời gian giao hàng bao lâu?", a: "Nội thành Hà Nội & TP.HCM: 2 giờ. Các tỉnh khác: 2-3 ngày làm việc." },
    { q: "Chính sách bảo hành thế nào?", a: "Bảo hành chính hãng 12-24 tháng tùy sản phẩm. 1 đổi 1 trong 30 ngày đầu nếu lỗi NSX." },
    { q: "Có hỗ trợ trả góp không?", a: "Có hỗ trợ trả góp 0% qua thẻ tín dụng hoặc các công ty tài chính (Home Credit, FE Credit)." },
  ];

  useGSAP(() => {
    // 1. Title Animation
    gsap.from(".contact-title span", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out"
    });

    // 2. Form & Map Slide in
    gsap.from(".contact-form", {
      x: -50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    });

    gsap.from(".contact-map", {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out"
    });

    // 3. FAQ Animation (ĐÃ SỬA: Dùng fromTo để không bị mờ)
    gsap.fromTo(".faq-item", 
      { y: 30, opacity: 0 }, // Trạng thái bắt đầu
      {
        scrollTrigger: { trigger: ".faq-section", start: "top 80%" },
        y: 0,
        opacity: 1, // Trạng thái kết thúc (Rõ nét 100%)
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen font-sans pb-20 overflow-x-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size:24px_24px"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent to-black"></div>

        <div className="relative z-10 px-6">
          <p className="text-blue-500 font-bold tracking-[0.4em] uppercase text-sm mb-4">Support 24/7</p>
          <h1 className="contact-title text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="inline-block">LET'S</span> <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">CONNECT</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-lg">
            Bạn có câu hỏi về sản phẩm hay dự án hợp tác? Đội ngũ của chúng tôi luôn sẵn sàng lắng nghe.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 mb-32">
          
          {/* 2. CONTACT FORM */}
          <div className="contact-form lg:w-1/2">
            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[50px] group-hover:bg-blue-600/40 transition-all duration-700"></div>
              <h3 className="text-2xl font-bold mb-8">Gửi tin nhắn</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-2">Họ tên</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-white" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-2">Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-white" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-2">Chủ đề</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 text-white appearance-none cursor-pointer">
                    <option>Hỗ trợ kỹ thuật</option>
                    <option>Tư vấn mua hàng</option>
                    <option>Hợp tác kinh doanh</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-2">Nội dung</label>
                  <textarea rows={4} placeholder="Bạn cần giúp gì..." className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-white resize-none"></textarea>
                </div>
                <button type="submit" className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 shadow-lg ${isSent ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/30'}`}>
                  {isSent ? '✓ Đã gửi thành công!' : 'Gửi ngay'}
                </button>
              </form>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center hover:border-blue-500/50 transition cursor-pointer">
                <div className="text-3xl mb-2">📧</div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="font-bold">hello@nextstore.vn</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center hover:border-blue-500/50 transition cursor-pointer">
                <div className="text-3xl mb-2">📱</div>
                <p className="text-gray-400 text-sm">Hotline</p>
                <p className="font-bold">1900 6969</p>
              </div>
            </div>
          </div>

          {/* 3. MAP */}
          <div className="contact-map lg:w-1/2 h-150 lg:h-auto relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe 
              src="https://maps.google.com/maps?q=Keangnam%20Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full grayscale invert hue-rotate-180 contrast-[1.2] opacity-80 hover:opacity-100 transition-opacity duration-500"
              style={{ border: 0 }} 
              loading="lazy" 
            ></iframe>
            <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-xs">
              <h4 className="font-bold text-xl mb-2 text-white">Trụ sở chính</h4>
              <p className="text-gray-400 text-sm mb-4">Tầng 72, Keangnam Landmark, Phạm Hùng, Hà Nội</p>
              <button className="text-blue-400 text-sm font-bold hover:underline">Chỉ đường →</button>
            </div>
          </div>
        </div>

        {/* 4. FAQ SECTION (Đã Fix lỗi mờ) */}
        <section className="faq-section max-w-3xl mx-auto py-20 border-t border-white/10">
          <h2 className="text-3xl font-bold text-center mb-12">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-gray-600">
                <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
                  <span className="font-bold text-lg">{faq.q}</span>
                  <span className={`text-2xl transition-transform duration-300 ${openFaq === index ? 'rotate-45 text-blue-500' : 'text-gray-500'}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}