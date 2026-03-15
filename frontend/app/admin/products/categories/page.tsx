'use client';

import { useState } from "react";

export default function ProductCategories() {
  // Mock Data
  const [categories, setCategories] = useState([
    { id: 1, name: "Điện thoại", slug: "dien-thoai", count: 120, desc: "Smartphone cao cấp, giá rẻ..." },
    { id: 2, name: "Laptop", slug: "laptop", count: 45, desc: "Laptop gaming, văn phòng..." },
    { id: 3, name: "Âm thanh", slug: "am-thanh", count: 32, desc: "Loa, tai nghe, mic..." },
    { id: 4, name: "Phụ kiện", slug: "phu-kien", count: 200, desc: "Cáp sạc, ốp lưng..." },
  ]);

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <h1 className="text-3xl font-black text-white">Danh mục sản phẩm</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- FORM THÊM MỚI (Cột Trái) --- */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl h-fit sticky top-4">
          <h3 className="text-lg font-bold text-white mb-4">Thêm danh mục mới</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tên danh mục</label>
              <input type="text" placeholder="Ví dụ: Đồng hồ thông minh" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
              <p className="text-[10px] text-gray-500 mt-1">Tên này sẽ hiển thị trên trang web.</p>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Đường dẫn (Slug)</label>
              <input type="text" placeholder="dong-ho-thong-minh" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
              <p className="text-[10px] text-gray-500 mt-1">Chuỗi cho URL, thường là chữ thường, không dấu.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mô tả</label>
              <textarea placeholder="Mô tả ngắn về danh mục này..." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition h-24 resize-none"></textarea>
            </div>

            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition">
              Thêm danh mục
            </button>
          </div>
        </div>

        {/* --- DANH SÁCH (Cột Phải) --- */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-black text-white uppercase font-bold text-xs">
              <tr>
                <th className="px-6 py-4 w-10"><input type="checkbox" className="rounded bg-black border-zinc-700" /></th>
                <th className="px-6 py-4">Tên</th>
                <th className="px-6 py-4">Mô tả</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-center">Số lượng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-white/5 transition group">
                  <td className="px-6 py-4"><input type="checkbox" className="rounded bg-black border-zinc-700" /></td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-white text-base block mb-1">{cat.name}</span>
                    <div className="flex gap-2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-500 hover:underline">Sửa</button>
                      <span className="text-zinc-600">|</span>
                      <button className="text-red-500 hover:underline">Xóa</button>
                      <span className="text-zinc-600">|</span>
                      <button className="text-gray-400 hover:underline">Xem</button>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{cat.desc}</td>
                  <td className="px-6 py-4 font-mono text-xs">{cat.slug}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-white">{cat.count}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}