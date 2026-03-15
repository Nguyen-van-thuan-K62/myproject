'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái menu mobile
  const [scrolled, setScrolled] = useState(false); // Trạng thái cuộn trang
  const pathname = usePathname(); // Lấy đường dẫn hiện tại để active menu
  const [isSearchOpen, setSearchOpen] = useState(false);

  // Xử lý hiệu ứng khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/san-pham" },
    { name: "Tin tức", href: "/tin-tuc" },
    { name: "Giới thiệu", href: "/gioi-thieu" },
    { name: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent
          ${scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-3" : "bg-transparent py-5"}
        `}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* 1. LOGO */}
          <Link href="/" className="text-2xl font-black tracking-tighter group">
            NEXT<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-600 group-hover:brightness-125 transition">STORE</span>
            <span className="text-blue-500 text-3xl leading-none">.</span>
          </Link>

          {/* 2. DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-bold uppercase tracking-wide transition-all relative group
                    ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
                  `}
                >
                  {link.name}
                  {/* Dấu chấm active */}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 transition-all duration-300 
                    ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"}
                  `}></span>
                </Link>
              );
            })}
          </nav>

          {/* 3. ICONS & ACTIONS */}
          <div className="flex items-center gap-6">
            
            {/* Search Icon */}
            <button 
                onClick={() => setSearchOpen(true)} // Thêm sự kiện click
                className="text-gray-400 hover:text-white transition hidden sm:block"
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <Link href="/gio-hang" className="relative text-gray-400 hover:text-white transition group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 5.407c.49 2.1-.924 3.087-1.12 3.237-3.205 1.942-12.35 2.111-15.65.621-.65-.296-1.58-.936-1.07-3.294a20.916 20.916 0 0 0 .97-3.957l.154-.647c.21-1.077 1.15-1.874 2.25-1.874h11.233c.89 0 1.693.518 2.074 1.307Z" />
              </svg>
              {/* Badge số lượng */}
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                3
              </span>
            </Link>

            {/* Login Button */}
            <Link 
              href="/login" 
              className="hidden md:block bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-gray-200 transition transform hover:-translate-y-0.5"
            >
              Đăng nhập
            </Link>

            {/* Mobile Menu Button (Hamburger) */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-white focus:outline-none relative z-50"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />

      {/* 4. MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      >
        {navLinks.map((link) => (
          <Link 
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-3xl font-black text-gray-400 hover:text-white hover:scale-110 transition uppercase tracking-tighter"
          >
            {link.name}
          </Link>
        ))}
        
        <Link 
          href="/login"
          onClick={() => setIsOpen(false)}
          className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-blue-500 transition"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </>
  );
}