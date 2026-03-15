'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

//   const menuItems = [
//     { name: "Dashboard", href: "/admin", icon: "📊" },
//     { name: "Sản phẩm", href: "/admin/products", icon: "📦" },
//     { name: "Đơn hàng", href: "/admin/orders", icon: "🛒" },
//     { name: "Khuyến mãi", href: "/admin/coupons", icon: "🎫" },
//     { name: "Khách hàng", href: "/admin/customers", icon: "👥" },
//     { name: "Viết bài", href: "/admin/blog/add", icon: "✍️" },
//     { name: "Cài đặt", href: "/admin/settings", icon: "⚙️" },
//   ];
    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: "📊" },
        
        // Tách nhóm Sản phẩm
        { name: "Sản phẩm", href: "/admin/products", icon: "📦" },
        { name: "Danh mục SP", href: "/admin/products/categories", icon: "📂" }, // Mới thêm

        { name: "Đơn hàng", href: "/admin/orders", icon: "🛒" },
        { name: "Khách hàng", href: "/admin/customers", icon: "👥" },
        
        // Tách nhóm Blog
        { name: "Bài viết", href: "/admin/blog/add", icon: "✍️" }, // Ông nhớ tạo trang list bài viết ở /admin/blog/page.tsx nhé
        { name: "Chuyên mục Blog", href: "/admin/blog/categories", icon: "🏷️" }, // Mới thêm

        { name: "Khuyến mãi", href: "/admin/coupons", icon: "🎫" },
        { name: "Cài đặt", href: "/admin/settings", icon: "⚙️" },
    ];

  return (
    // z-[100] để đè lên Header/Footer của trang khách
    <div className="fixed inset-0 z-100 bg-black text-white flex overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className={`bg-zinc-900 border-r border-zinc-800 transition-all duration-300 flex flex-col
        ${isSidebarOpen ? "w-64" : "w-20"}
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-zinc-800">
          {isSidebarOpen ? (
             <h1 className="text-xl font-black tracking-tighter">ADMIN<span className="text-blue-500">.</span></h1>
          ) : (
             <span className="text-xl font-black text-blue-500">A.</span>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group
                  ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-gray-400 hover:bg-white/5 hover:text-white"}
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen && <span className="font-bold text-sm">{item.name}</span>}
                
                {/* Tooltip khi đóng menu */}
                {!isSidebarOpen && (
                  <div className="absolute left-16 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-50 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">AD</div>
             {isSidebarOpen && (
               <div>
                 <p className="text-sm font-bold">Admin</p>
                 <Link href="/" className="text-xs text-gray-500 hover:text-blue-400">Về trang chủ &rarr;</Link>
               </div>
             )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col bg-black relative">
        {/* Top Bar */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-black/50 backdrop-blur-md">
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white">
             {isSidebarOpen ? "◀ Thu gọn" : "▶ Mở rộng"}
           </button>
           <div className="flex gap-4">
             <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm">🔔</button>
             <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm">⚙️</button>
           </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}