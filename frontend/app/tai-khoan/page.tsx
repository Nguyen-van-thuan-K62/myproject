'use client';

import { useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("orders"); // orders | profile | address

  // Dữ liệu giả lập đơn hàng
  const myOrders = [
    { id: "#NX8821", date: "10/02/2026", total: "$1,199", status: "Shipping", items: ["iPhone 15 Pro Max"] },
    { id: "#NX8810", date: "05/01/2026", total: "$349", status: "Completed", items: ["Sony WH-1000XM5"] },
    { id: "#NX8805", date: "24/12/2025", total: "$50", status: "Cancelled", items: ["Ốp lưng MagSafe"] },
  ];

  const statusStyles: any = {
    Shipping: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Completed: "text-green-400 bg-green-400/10 border-green-400/20",
    Cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  useGSAP(() => {
    gsap.from(".fade-in", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 });
  }, [activeTab]);

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* --- SIDEBAR MENU --- */}
          <div className="w-full md:w-1/4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-600 mx-auto mb-4 flex items-center justify-center text-3xl font-bold border-4 border-black">
                T
              </div>
              <h2 className="text-xl font-bold">Thuan Nguyen</h2>
              <p className="text-gray-500 text-sm">Thành viên Bạc</p>
            </div>

            <nav className="space-y-2">
              {[
                { id: "orders", label: "📦 Đơn mua", desc: "Xem lịch sử đơn hàng" },
                { id: "profile", label: "👤 Tài khoản", desc: "Thông tin cá nhân" },
                { id: "address", label: "📍 Địa chỉ", desc: "Sổ địa chỉ nhận hàng" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center group
                    ${activeTab === tab.id 
                      ? "bg-white text-black border-white" 
                      : "bg-zinc-900 text-gray-400 border-zinc-800 hover:border-zinc-600 hover:text-white"}
                  `}
                >
                  <div>
                    <div className="font-bold">{tab.label}</div>
                    <div className={`text-xs ${activeTab === tab.id ? "text-gray-600" : "text-gray-600 group-hover:text-gray-400"}`}>{tab.desc}</div>
                  </div>
                  {activeTab === tab.id && <span>→</span>}
                </button>
              ))}
              <button className="w-full text-left p-4 rounded-xl border border-zinc-800 bg-zinc-900 text-red-500 hover:bg-red-500/10 hover:border-red-500/50 transition mt-8 font-bold">
                Đăng xuất
              </button>
            </nav>
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="w-full md:w-3/4">
            
            {/* TAB: ORDERS */}
            {activeTab === "orders" && (
              <div className="space-y-6 fade-in">
                <h2 className="text-3xl font-black mb-6">Lịch sử đơn hàng</h2>
                {myOrders.map((order) => (
                  <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                           <h3 className="font-bold text-lg text-white">{order.id}</h3>
                           <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[order.status]}`}>
                             {order.status === 'Shipping' ? 'Đang giao' : order.status === 'Completed' ? 'Hoàn thành' : 'Đã hủy'}
                           </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Đặt ngày: {order.date}</p>
                      </div>
                      <div className="text-xl font-black text-blue-500">{order.total}</div>
                    </div>
                    
                    <div className="border-t border-zinc-800 pt-4 text-sm text-gray-400 flex justify-between items-center">
                      <p>{order.items.join(", ")} {order.items.length > 1 && "..."}</p>
                      <button className="text-white underline hover:text-blue-400">Xem chi tiết</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === "profile" && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 fade-in">
                <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Họ tên</label>
                    <input type="text" defaultValue="Thuan Nguyen" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                    <input type="email" defaultValue="thuan@example.com" disabled className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Số điện thoại</label>
                    <input type="text" defaultValue="0988xxxxxx" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Giới tính</label>
                    <select className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>
                <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-600/20">
                  Lưu thay đổi
                </button>
              </div>
            )}

            {/* TAB: ADDRESS */}
            {activeTab === "address" && (
              <div className="fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Sổ địa chỉ</h2>
                  <button className="text-sm font-bold text-blue-500 hover:underline">+ Thêm mới</button>
                </div>
                <div className="space-y-4">
                  <div className="bg-zinc-900 border border-blue-500/50 p-6 rounded-2xl relative">
                    <span className="absolute top-4 right-4 text-blue-500 text-xs font-bold bg-blue-500/10 px-2 py-1 rounded">Mặc định</span>
                    <h3 className="font-bold text-white mb-1">Nhà riêng</h3>
                    <p className="text-gray-400 text-sm">Tầng 72, Keangnam Landmark, Phạm Hùng, Hà Nội</p>
                    <p className="text-gray-400 text-sm mt-1">SĐT: 0988xxxxxx</p>
                    <div className="mt-4 flex gap-4 text-sm font-bold">
                      <button className="text-blue-500 hover:text-white">Sửa</button>
                      <button className="text-red-500 hover:text-white">Xóa</button>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <h3 className="font-bold text-white mb-1">Công ty</h3>
                    <p className="text-gray-400 text-sm">Tòa nhà FPT, Duy Tân, Cầu Giấy, Hà Nội</p>
                    <p className="text-gray-400 text-sm mt-1">SĐT: 0988xxxxxx</p>
                    <div className="mt-4 flex gap-4 text-sm font-bold">
                      <button className="text-gray-500 hover:text-white">Thiết lập mặc định</button>
                      <button className="text-blue-500 hover:text-white">Sửa</button>
                      <button className="text-red-500 hover:text-white">Xóa</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}