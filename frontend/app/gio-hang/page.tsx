'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CartPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. DỮ LIỆU GIẢ LẬP
  const initialItems = [
    { id: 1, name: "iPhone 15 Pro Max", price: 1199, img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=200&q=80", color: "Titan Tự nhiên", storage: "256GB", qty: 1 },
    { id: 2, name: "Sony WH-1000XM5", price: 349, img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80", color: "Bạc", storage: "Standard", qty: 2 },
  ];

  const [cartItems, setCartItems] = useState(initialItems);
  
  // State Form & Payment
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", note: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | banking | momo
  const [isOrdering, setIsOrdering] = useState(false); // Trạng thái đang gửi đơn
  const [isSuccess, setIsSuccess] = useState(false); // Trạng thái thành công

  // 2. LOGIC GIỎ HÀNG
  const updateQty = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(items => items.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const removeItem = (id: number) => {
    const row = document.getElementById(`cart-item-${id}`);
    if (row) {
      gsap.to(row, {
        x: -50, opacity: 0, duration: 0.3, onComplete: () => {
           setCartItems(items => items.filter(item => item.id !== id));
        }
      });
    }
  };

  // Tính tiền
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.1; 
  const shippingThreshold = 2000;
  const shippingFee = subtotal > shippingThreshold ? 0 : 20;
  const total = subtotal + tax + shippingFee;
  const progressToFreeShip = Math.min((subtotal / shippingThreshold) * 100, 100);

  // 3. XỬ LÝ ĐẶT HÀNG
  const handleOrder = () => {
    // Validate cơ bản
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng!");
      // Scroll to form (Optional)
      document.getElementById("shipping-form")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsOrdering(true);

    // Giả lập gọi API mất 2 giây
    setTimeout(() => {
      setIsOrdering(false);
      setIsSuccess(true);
      // Xóa giỏ hàng sau khi đặt thành công
      setCartItems([]);
    }, 2000);
  };

  // 4. ANIMATION
  useGSAP(() => {
    if (cartItems.length > 0) {
      gsap.fromTo(".cart-item", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", clearProps: "opacity" }
      );
      gsap.fromTo(".fade-in-section",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3, stagger: 0.1 }
      );
    }
  }, { scope: containerRef, dependencies: [cartItems.length === 0] });

  // 5. MÀN HÌNH THÀNH CÔNG (SUCCESS MODAL)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl text-center max-w-md w-full shadow-2xl relative overflow-hidden">
          {/* Confetti effect background */}
          <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
          
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.6)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-black mb-2">Đặt hàng thành công!</h2>
          <p className="text-gray-400 mb-8">Cảm ơn <span className="text-white font-bold">{formData.name}</span> đã ủng hộ. Mã đơn hàng của bạn là <span className="text-blue-500 font-mono">#NEXT2026</span>.</p>
          
          <Link href="/" className="block w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen font-sans pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        <h1 className="text-4xl md:text-5xl font-black mb-10">Giỏ hàng ({cartItems.length})</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* --- CỘT TRÁI --- */}
            <div className="w-full lg:w-2/3 space-y-8">
              
              {/* 1. Free Ship Bar */}
              <div className="fade-in-section bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                <div className="flex justify-between text-sm font-bold mb-2 relative z-10">
                  <span>{progressToFreeShip < 100 ? `Mua thêm $${shippingThreshold - subtotal} để được Free Ship` : "Chúc mừng! Bạn được Free Ship 🎉"}</span>
                  <span>{Math.round(progressToFreeShip)}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-1000" style={{ width: `${progressToFreeShip}%` }}></div>
                </div>
              </div>

              {/* 2. Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div id={`cart-item-${item.id}`} key={item.id} className="cart-item bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6 hover:border-blue-500/30 transition-all opacity-100">
                    <div className="w-24 h-24 bg-white/5 rounded-xl overflow-hidden shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-lg text-white">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.color} | {item.storage}</p>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 text-xs font-bold mt-2 hover:underline">× Xóa</button>
                    </div>
                    <div className="flex items-center bg-black border border-zinc-700 rounded-lg">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 hover:text-blue-500 transition">-</button>
                      <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 hover:text-blue-500 transition">+</button>
                    </div>
                    <div className="text-right w-24 font-bold text-xl">${item.price * item.qty}</div>
                  </div>
                ))}
              </div>

              {/* 3. FORM GIAO HÀNG */}
              <div id="shipping-form" className="fade-in-section bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><span>📍</span> Thông tin giao hàng</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Họ và tên *</label>
                    <input type="text" placeholder="Nguyễn Van A" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Số điện thoại *</label>
                    <input type="text" placeholder="09xxx..." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Địa chỉ nhận hàng *</label>
                    <input type="text" placeholder="Số nhà, đường, phường/xã..." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                      value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ghi chú</label>
                    <textarea placeholder="Giao giờ hành chính..." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white resize-none h-24"
                      value={formData.note} onChange={(e) => setFormData({...formData, note: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 4. PHƯƠNG THỨC THANH TOÁN (MỚI) */}
              <div className="fade-in-section bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><span>💳</span> Phương thức thanh toán</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Option 1: COD */}
                  <div 
                    onClick={() => setPaymentMethod("cod")}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center
                      ${paymentMethod === "cod" ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-zinc-500 bg-black"}
                    `}
                  >
                    <span className="text-3xl">💵</span>
                    <span className="font-bold text-sm">Tiền mặt (COD)</span>
                  </div>

                  {/* Option 2: Banking */}
                  <div 
                    onClick={() => setPaymentMethod("banking")}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center
                      ${paymentMethod === "banking" ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-zinc-500 bg-black"}
                    `}
                  >
                    <span className="text-3xl">🏦</span>
                    <span className="font-bold text-sm">Chuyển khoản QR</span>
                  </div>

                  {/* Option 3: Momo */}
                  <div 
                    onClick={() => setPaymentMethod("momo")}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center
                      ${paymentMethod === "momo" ? "border-pink-500 bg-pink-500/10" : "border-zinc-700 hover:border-zinc-500 bg-black"}
                    `}
                  >
                    <span className="text-3xl">👛</span>
                    <span className="font-bold text-sm">Ví Momo</span>
                  </div>
                </div>

                {/* Thông tin chuyển khoản (Hiện khi chọn Banking) */}
                {paymentMethod === "banking" && (
                  <div className="mt-6 p-4 bg-black rounded-xl border border-zinc-700 animate-fade-in text-sm text-gray-300">
                    <p className="font-bold text-white mb-2">Thông tin chuyển khoản:</p>
                    <p>• Ngân hàng: <span className="text-blue-400">MB Bank</span></p>
                    <p>• Số tài khoản: <span className="text-blue-400 font-mono text-lg">9999.8888.6666</span></p>
                    <p>• Chủ tài khoản: <span className="text-white">NGUYEN VAN THUAN</span></p>
                    <p>• Nội dung: <span className="text-yellow-400">SDT Mua Hang</span></p>
                  </div>
                )}
              </div>

            </div>

            {/* --- CỘT PHẢI: TỔNG TIỀN (Sticky) --- */}
            <div className="w-full lg:w-1/3">
              <div className="fade-in-section sticky top-28 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Tổng đơn hàng</h3>
                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between text-gray-400"><span>Tạm tính</span><span className="text-white font-bold">${subtotal}</span></div>
                  <div className="flex justify-between text-gray-400"><span>Thuế (10%)</span><span className="text-white font-bold">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-400">
                    <span>Vận chuyển</span>
                    {shippingFee === 0 ? <span className="text-green-400 font-bold">Miễn phí</span> : <span className="text-white font-bold">${shippingFee}</span>}
                  </div>
                  <div className="border-t border-zinc-700 pt-4 flex justify-between items-end">
                    <span className="text-lg font-bold">Tổng cộng</span>
                    <span className="text-3xl font-black text-blue-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* NÚT ĐẶT HÀNG */}
                <button 
                  onClick={handleOrder}
                  disabled={isOrdering}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/40 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isOrdering ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    "Đặt hàng ngay"
                  )}
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">🔒 Bảo mật SSL 100%</p>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
             <div className="w-40 h-40 bg-zinc-900 rounded-full flex items-center justify-center mb-6"><span className="text-6xl">🛒</span></div>
             <h2 className="text-2xl font-bold text-white mb-4">Giỏ hàng trống</h2>
             <Link href="/san-pham" className="text-blue-500 hover:underline">Quay lại mua sắm</Link>
          </div>
        )}
      </div>
    </div>
  );
}