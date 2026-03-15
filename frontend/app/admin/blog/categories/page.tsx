'use client';

import { useState } from "react";

export default function BlogCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Tin công nghệ", slug: "tin-cong-nghe", count: 45, desc: "Tin tức mới nhất về Apple, Samsung..." },
    { id: 2, name: "Review sản phẩm", slug: "review", count: 80, desc: "Đánh giá chi tiết, trên tay..." },
    { id: 3, name: "Thủ thuật", slug: "thu-thuat", count: 120, desc: "Hướng dẫn sử dụng, tips & tricks..." },
    { id: 4, name: "Khuyến mãi", slug: "khuyen-mai", count: 15, desc: "Thông tin giảm giá, voucher..." },
  ]);

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex items-center gap-2 mb-2">
         <span className="text-gray-500 text-sm font-bold uppercase">Blog</span>
         <span className="text-gray-500">/</span>
         <span className="text-white text-sm font-bold uppercase">Categories</span>
      </div>
      <h1 className="text-3xl font-black text-white">Chuyên mục bài viết</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- FORM THÊM (Cột Trái) --- */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl h-fit sticky top-4">
          <h3 className="text-lg font-bold text-white mb-4">Tạo chuyên mục</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tên chuyên mục</label>
              <input type="text" placeholder="Ví dụ: Tin tức" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Slug</label>
              <input type="text" placeholder="tin-tuc" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Danh mục cha</label>
              <select className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition">
                <option value="0">-- Trống --</option>
                <option value="1">Tin công nghệ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mô tả</label>
              <textarea className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition h-24 resize-none"></textarea>
            </div>

            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition">
              Thêm mới
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
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-center">Bài viết</th>
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
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-blue-400">{cat.slug}</td>
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