'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. DỮ LIỆU GIẢ LẬP
  const categories = ["All", "Smartphone", "Laptop", "Audio", "Watch"];
  
  const allProducts = [
    { id: "iphone-15", name: "iPhone 15 Pro Max", price: "$1,199", cat: "Smartphone", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80" },
    { id: "macbook-pro", name: "MacBook Pro M3", price: "$1,599", cat: "Laptop", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500&q=80" },
    { id: "sony-xm5", name: "Sony WH-1000XM5", price: "$349", cat: "Audio", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80" },
    { id: "apple-watch", name: "Apple Watch Ultra 2", price: "$799", cat: "Watch", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80" },
    { id: "dell-xps", name: "Dell XPS 15", price: "$1,899", cat: "Laptop", img: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=500&q=80" },
    { id: "samsung-s24", name: "Samsung S24 Ultra", price: "$1,299", cat: "Smartphone", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80" },
    { id: "airpods-max", name: "AirPods Max", price: "$549", cat: "Audio", img: "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?w=500&q=80" },
    { id: "ipad-pro", name: "iPad Pro M4", price: "$999", cat: "Smartphone", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80" },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // 2. XỬ LÝ LỌC SẢN PHẨM
  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    
    // Animation Fade Out trước khi đổi dữ liệu
    gsap.to(".product-card", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        // Cập nhật dữ liệu
        if (cat === "All") {
          setFilteredProducts(allProducts);
        } else {
          setFilteredProducts(allProducts.filter(p => p.cat === cat));
        }
      }
    });
  };

  // 3. ANIMATION KHI DỮ LIỆU THAY ĐỔI
  // Dùng useEffect để chạy mỗi khi filteredProducts thay đổi
  useEffect(() => {
    gsap.fromTo(".product-card", 
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, [filteredProducts]);

  useGSAP(() => {
    // Header Animation
    gsap.from(".page-title", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".filter-bar", { x: -50, opacity: 0, duration: 1, delay: 0.3 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen pt-20 pb-20 font-sans">
      
      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 mb-16">
        <h1 className="page-title text-5xl md:text-7xl font-black uppercase tracking-tighter">
          The <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-600">Collection</span>
        </h1>
        <p className="page-title text-gray-400 mt-4 max-w-xl text-lg">
          Khám phá những thiết bị công nghệ đỉnh cao được tuyển chọn kỹ lưỡng cho tương lai của bạn.
        </p>
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR FILTER (Desktop) / TOP BAR (Mobile) */}
        <aside className="filter-bar w-full md:w-1/4 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-gray-500 uppercase tracking-widest">Danh mục</h3>
            <ul className="space-y-2 flex md:block overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0">
              {categories.map((cat) => (
                <li key={cat} className="shrink-0">
                  <button
                    onClick={() => handleFilter(cat)}
                    className={`text-lg font-medium px-4 py-2 rounded-full md:rounded-lg w-full text-left transition-all duration-300 flex justify-between items-center group
                      ${activeCategory === cat 
                        ? "bg-white text-black pl-6" 
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {cat}
                    {activeCategory === cat && <span className="text-blue-600 text-xl font-bold">●</span>}
                  </button>
                </li>
              ))}
            </ul>

            {/* Banner nhỏ ở Sidebar */}
            <div className="hidden md:block mt-12 p-6 rounded-2xl bg-linear-to-br from-blue-900/50 to-purple-900/50 border border-white/10">
              <p className="text-sm font-bold text-blue-300 mb-2">HOT DEAL</p>
              <h4 className="text-2xl font-bold mb-4">Giảm 20% cho thành viên mới</h4>
              <button className="text-xs bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-blue-500 hover:text-white transition">Đăng ký ngay</button>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <main className="w-full">
          {/* Thanh Search & Sort */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
            <p className="text-gray-400 text-sm">Hiển thị <span className="text-white font-bold">{filteredProducts.length}</span> sản phẩm</p>
            <div className="flex gap-4">
               <select className="bg-black border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                 <option>Mới nhất</option>
                 <option>Giá thấp - cao</option>
                 <option>Giá cao - thấp</option>
               </select>
            </div>
          </div>

          {/* Lưới sản phẩm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/san-pham/${product.id}`}
                className="product-card group relative block"
              >
                {/* Card Container */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                  
                  {/* Image Area */}
                  <div className="relative h-64 overflow-hidden bg-white/5">
                    <Image 
                      src={product.img} 
                      alt={product.name} 
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-xs font-bold text-white">{product.cat}</span>
                    </div>

                    {/* Quick Add Button (Hiện khi hover) */}
                    <button className="absolute bottom-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-blue-500 hover:text-white">
                      +
                    </button>
                  </div>

                  {/* Info Area */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors truncate">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">Bảo hành 12 tháng</p>
                    <div className="flex justify-between items-center border-t border-white/10 pt-3">
                      <span className="text-xl font-bold text-white">{product.price}</span>
                      <span className="text-xs text-blue-500 font-bold hover:underline">Xem chi tiết &rarr;</span>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>

          {/* Empty State (Nếu lọc không ra gì) */}
          {filteredProducts.length === 0 && (
             <div className="text-center py-20">
               <div className="text-6xl mb-4">🤔</div>
               <h3 className="text-xl font-bold">Không tìm thấy sản phẩm nào</h3>
               <button onClick={() => handleFilter("All")} className="mt-4 text-blue-500 hover:underline">Xem tất cả</button>
             </div>
          )}

          {/* Load More Button */}
          {filteredProducts.length > 0 && (
            <div className="mt-16 text-center">
              <button className="px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                Xem thêm sản phẩm
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}