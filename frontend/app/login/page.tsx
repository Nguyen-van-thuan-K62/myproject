'use client';
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { login, register } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State để chuyển đổi giữa Login (true) và Register (false)
  const [isLogin, setIsLogin] = useState(true);

  // State xử lý form
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Hàm chuyển đổi chế độ
  const toggleMode = () => {
    // Animation fade out form cũ
    gsap.to(".auth-form-container", {
      opacity: 0,
      x: isLogin ? -20 : 20,
      duration: 0.3,
      onComplete: () => {
        setIsLogin(!isLogin);
        // Animation fade in form mới
        gsap.fromTo(".auth-form-container",
          { opacity: 0, x: isLogin ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.3 }
        );
      }
    });
  };

  // Hàm xử lý Submit 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const data = await login(email, password);

        // Lưu token
        localStorage.setItem("token", data.token);

        router.push("/"); // chuyển về trang chủ
      } else {
        await register(name, email, password);

        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        setIsLogin(true);
      }
    } catch (error: any) {
      alert("Có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  useGSAP(() => {
    // Hiệu ứng vào trang: Card bay lên
    gsap.from(".auth-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });

    // Hiệu ứng nền
    gsap.to(".bg-blob", {
      y: 50,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* 1. BACKGROUND ANIMATED (Nền động) */}
      <div className="absolute inset-0 w-full h-full">
        <div className="bg-blob absolute top-0 left-0 w-125 h-125 bg-blue-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="bg-blob absolute bottom-0 right-0 w-125 h-125 bg-purple-600/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 animation-delay-2000"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]"></div>
      </div>

      {/* 2. AUTH CARD (Khung chính) */}
      <div className="auth-card w-full max-w-4xl bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row min-h-125">
        
        {/* LEFT SIDE: Banner ảnh */}
        <div className="w-full md:w-1/2 relative hidden md:block group overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000" 
            alt="Auth Banner" 
            fill
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-3xl font-bold mb-2 text-white">Welcome back</h2>
            <p className="text-gray-300 text-sm">Trải nghiệm mua sắm công nghệ đỉnh cao ngay hôm nay.</p>
          </div>
        </div>

        {/* RIGHT SIDE: Form nhập liệu */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/20">
          
          <div className="auth-form-container">
            {/* Header Form */}
            <div className="text-center md:text-left mb-8">
              <h1 className="text-3xl font-black mb-2">
                {isLogin ? "Đăng nhập" : "Tạo tài khoản"}
              </h1>
              <p className="text-gray-400 text-sm">
                {isLogin ? "Nhập thông tin để truy cập." : "Đăng ký miễn phí chỉ trong 30 giây."}
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Nếu là Đăng ký thì hiện thêm ô Tên */}
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Họ tên</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyen Van A" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-black/50 transition-all text-white" required />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-black/50 transition-all text-white" required />
              </div>

              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mật khẩu</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-black/50 transition-all text-white" 
                  required 
                />
                {/* Nút hiện pass */}
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-500 hover:text-white text-xs"
                >
                  {showPassword ? "ẨN" : "HIỆN"}
                </button>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs text-blue-500 hover:text-blue-400 font-bold">Quên mật khẩu?</a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isLoading && <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>}
                {isLogin ? "Đăng nhập ngay" : "Đăng ký tài khoản"}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative flex py-5 items-center">
                <div className="grow border-t border-white/10"></div>
                <span className="shrink-0 mx-4 text-gray-500 text-xs">Hoặc tiếp tục với</span>
                <div className="grow border-t border-white/10"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-lg hover:bg-white hover:text-black transition text-sm font-bold">
                  <span>G</span> Google
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-lg hover:bg-white hover:text-black transition text-sm font-bold">
                  <span></span> Apple
                </button>
              </div>
            </div>

            {/* Switcher Toggle */}
            <div className="mt-8 text-center text-sm text-gray-400">
              {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <button 
                onClick={toggleMode} 
                className="text-blue-500 font-bold hover:underline ml-1 focus:outline-none"
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}