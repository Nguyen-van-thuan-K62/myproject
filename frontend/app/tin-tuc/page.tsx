'use client';

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. DỮ LIỆU GIẢ (Mock Data)
  const posts = [
    {
      id: 1,
      title: "Review iPhone 15 Pro Max sau 6 tháng: Vẫn là vua?",
      excerpt: "Liệu titan có bền như lời đồn? Hiệu năng A17 Pro ra sao khi chơi Genshin Impact max setting?",
      category: "Review",
      date: "10 Feb, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80"
    },
    {
      id: 2,
      title: "Trí tuệ nhân tạo (AI) sẽ thay thế lập trình viên vào năm 2030?",
      excerpt: "Góc nhìn từ các chuyên gia Google và OpenAI về tương lai của ngành code.",
      category: "Tech News",
      date: "08 Feb, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      id: 3,
      title: "Top 5 Laptop Gaming đáng mua nhất tầm giá 20 triệu",
      excerpt: "Săn sale mùa tựu trường với những con quái vật hiệu năng giá rẻ.",
      category: "Tips",
      date: "05 Feb, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80"
    },
    {
      id: 4,
      title: "Hướng dẫn setup góc làm việc Minimalist cực chill",
      excerpt: "Biến góc làm việc thành nơi khơi nguồn cảm hứng sáng tạo.",
      category: "Lifestyle",
      date: "01 Feb, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80"
    },
  ];

  const trending = [
    { id: 1, title: "Lộ diện thiết kế Galaxy S25 Ultra", views: "12K views" },
    { id: 2, title: "Cách chặn quảng cáo YouTube 2026", views: "8.5K views" },
    { id: 3, title: "Elon Musk ra mắt robot nấu ăn", views: "20K views" },
  ];

  // 2. ANIMATION
  useGSAP(() => {
    // Hero Animation
    gsap.from(".featured-content", { y: 50, opacity: 0, duration: 1, delay: 0.2 });
    
    // List Animation (Stagger)
    gsap.from(".blog-card", {
      scrollTrigger: { trigger: ".blog-list", start: "top 80%" },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.2
    });

    // Sidebar Animation
    gsap.from(".sidebar-item", {
      scrollTrigger: { trigger: ".sidebar", start: "top 80%" },
      x: 50, opacity: 0, duration: 0.8, stagger: 0.1
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen font-sans pb-20">
      
      {/* 1. FEATURED POST (Bài viết tâm điểm) */}
      <section className="relative w-full h-[70vh] overflow-hidden group cursor-pointer">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070" 
            alt="Featured" 
            fill
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          {/* Overlay gradient tối dần xuống dưới */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-10 featured-content">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
            Editor's Choice
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl mb-4 group-hover:text-blue-400 transition-colors">
            Tương lai của Metaverse: <br/> Bong bóng hay Kỷ nguyên mới?
          </h1>
          <div className="flex items-center gap-4 text-gray-300 text-sm md:text-base">
             <div className="flex items-center gap-2">
                <img src="https://i.pravatar.cc/150?img=12" className="w-8 h-8 rounded-full border border-white" alt="Author" />
                <span>By Minh Dev</span>
             </div>
             <span>•</span>
             <span>Feb 12, 2026</span>
             <span>•</span>
             <span>10 min read</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT LAYOUT */}
      <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        
        {/* CỘT TRÁI: Danh sách bài viết (2/3) */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
            <h2 className="text-3xl font-bold">Mới cập nhật</h2>
            <div className="flex gap-4 text-gray-400 text-sm">
              <span className="text-white cursor-pointer underline">Tất cả</span>
              <span className="hover:text-white cursor-pointer transition">Review</span>
              <span className="hover:text-white cursor-pointer transition">Tech</span>
            </div>
          </div>

          <div className="blog-list grid grid-cols-1 gap-10">
            {posts.map((post) => (
              <Link href={`/tin-tuc/${post.id}`} key={post.id} className="blog-card group flex flex-col md:flex-row gap-6 items-center">
                {/* Ảnh Thumbnail */}
                <div className="w-full md:w-5/12 overflow-hidden rounded-xl h-64 md:h-52 relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold border border-white/10">
                    {post.category}
                  </div>
                </div>

                {/* Nội dung tóm tắt */}
                <div className="w-full md:w-7/12">
                  <div className="flex gap-3 text-xs text-gray-500 mb-2 uppercase tracking-wide">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="text-blue-500 text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Đọc tiếp &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center gap-2">
            {[1, 2, 3].map((page) => (
              <button key={page} className={`w-10 h-10 rounded-full border ${page === 1 ? 'bg-white text-black border-white' : 'border-gray-700 hover:border-white hover:text-white text-gray-500'} transition flex items-center justify-center font-bold`}>
                {page}
              </button>
            ))}
            <button className="px-4 h-10 rounded-full border border-gray-700 hover:border-white transition text-gray-500 hover:text-white flex items-center justify-center">
              Next &rarr;
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: Sidebar (1/3) */}
        <aside className="sidebar lg:w-1/3 space-y-12">
          
          {/* Trending Box */}
          <div className="sidebar-item bg-zinc-900/50 p-8 rounded-2xl border border-white/5 backdrop-blur-md">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-red-500 text-2xl">🔥</span> Trending
            </h3>
            <ul className="space-y-6">
              {trending.map((item, index) => (
                <li key={item.id} className="group cursor-pointer">
                  <div className="flex gap-4">
                    <span className="text-4xl font-black text-gray-700 group-hover:text-white transition-colors">0{index + 1}</span>
                    <div>
                      <h4 className="font-bold text-gray-200 group-hover:text-blue-400 transition leading-tight mb-1">{item.title}</h4>
                      <span className="text-xs text-gray-500">{item.views}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="sidebar-item relative overflow-hidden rounded-2xl p-8 text-center bg-blue-900/20 border border-blue-500/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-20"></div>
            <h3 className="text-xl font-bold mb-2">Đừng bỏ lỡ tin hot!</h3>
            <p className="text-gray-400 text-sm mb-6">Nhận bài viết mới nhất vào email mỗi sáng thứ 2.</p>
            <input 
              type="email" 
              placeholder="Email của bạn..." 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 mb-3"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-blue-600/20">
              Đăng ký ngay
            </button>
          </div>

          {/* Tags Cloud */}
          <div className="sidebar-item">
            <h3 className="text-xl font-bold mb-4">Tags phổ biến</h3>
            <div className="flex flex-wrap gap-2">
              {["iPhone", "AI", "Blockchain", "Gaming", "Review", "Code", "Startup"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-zinc-800 hover:bg-white hover:text-black rounded-full text-xs font-bold transition cursor-pointer border border-white/5">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </aside>
      </div>

    </div>
  );
}