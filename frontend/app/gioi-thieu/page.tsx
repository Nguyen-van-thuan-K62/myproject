// app/gioi-thieu/page.tsx
'use client';

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 10, label: "Năm kinh nghiệm", suffix: "+" },
    { value: 50, label: "Cửa hàng toàn cầu", suffix: "" },
    { value: 100, label: "Khách hàng hài lòng", suffix: "K" },
    { value: 24, label: "Giải thưởng công nghệ", suffix: "" },
  ];

  const team = [
    { name: "Alex Nguyen", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" },
    { name: "Sarah Le", role: "Head of Design", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" },
    { name: "Mike Tran", role: "Tech Lead", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" },
  ];

  useGSAP(() => {
    // 1. Hero Title Reveal
    gsap.from(".about-title span", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.2
    });

    // 2. Counter Animation (Số chạy từ 0 lên)
    stats.forEach((stat, index) => {
      gsap.fromTo(`.stat-item-${index}`, 
        { innerText: 0 },
        {
          innerText: stat.value,
          duration: 2,
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 80%",
          },
          snap: { innerText: 1 }, // Làm tròn số
          onUpdate: function() {
            // Cập nhật lại DOM để thêm suffix (+, K) vào sau số
            const element = document.querySelector(`.stat-item-${index}`);
            if(element) element.innerHTML = Math.round(this.targets()[0].innerText) + `<span class="text-blue-500 text-2xl">${stat.suffix}</span>`;
          }
        }
      );
    });

    // 3. Team Card Hover Effect
    gsap.from(".team-card", {
      scrollTrigger: {
        trigger: ".team-section",
        start: "top 70%",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen font-sans selection:bg-blue-500 selection:text-white pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue-900/20 to-black z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-600/20 rounded-full blur-[120px]"></div>

        <div className="relative z-10 px-6">
          <p className="text-blue-400 tracking-[0.3em] text-sm font-bold uppercase mb-4">Our Story</p>
          <h1 className="about-title text-5xl md:text-7xl font-black leading-tight">
            <span className="inline-block">KHÔNG</span> <span className="inline-block">CHỈ</span> <span className="inline-block">LÀ</span> <br/>
            <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">CÔNG NGHỆ.</span>
          </h1>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Chúng tôi sinh ra để định nghĩa lại cách con người tương tác với tương lai. 
            Từ một gara nhỏ đến hệ thống bán lẻ số 1 khu vực.
          </p>
        </div>
      </section>

      {/* 2. STATS SECTION (Số nhảy) */}
      <section className="stats-section py-20 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <div className={`stat-item-${index} text-5xl md:text-7xl font-black text-white mb-2`}>
                  0
                </div>
                <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION (Grid Layout) */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 opacity-20"></div>
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000" 
              alt="Office" 
              width={500}
              height={400}
              className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl z-10"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">Tầm nhìn <span className="text-blue-500">2030</span></h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Chúng tôi tin rằng công nghệ không nên phức tạp. Nó phải vô hình, mạnh mẽ và phục vụ cuộc sống con người một cách tự nhiên nhất.
            </p>
            <ul className="space-y-4">
              {["Đổi mới không ngừng", "Khách hàng là trọng tâm", "Cam kết bền vững"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xl font-medium">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. MEET THE TEAM */}
      <section className="team-section py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Biệt đội <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">Avengers</span></h2>
          <p className="text-gray-500 mt-4">Những bộ óc điên rồ đứng sau thành công của chúng tôi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="team-card group relative overflow-hidden rounded-2xl">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-100 object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-100 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-1">{member.role}</p>
                <h3 className="text-3xl font-bold text-white">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA JOIN US */}
      <section className="py-20 text-center container mx-auto px-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 md:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
           
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Bạn muốn gia nhập đội ngũ?</h2>
           <p className="text-gray-400 mb-10 max-w-xl mx-auto">
             Chúng tôi luôn tìm kiếm những tài năng kiệt xuất. Nếu bạn dám nghĩ khác biệt, hãy đến với chúng tôi.
           </p>
           <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition hover:-translate-y-1">
             Xem tuyển dụng
           </button>
        </div>
      </section>

    </div>
  );
}