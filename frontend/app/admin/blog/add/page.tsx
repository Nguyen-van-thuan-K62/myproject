'use client';

import { useState } from "react";
import Link from "next/link";

export default function AddBlogPost() {
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Giả lập upload ảnh bìa
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setCoverImage(fakeUrl);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
      
      {/* HEADER ACTION */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition">
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Viết bài mới</h1>
            <p className="text-xs text-gray-500">Last saved: Just now</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2 rounded-lg border border-zinc-700 text-gray-400 font-bold hover:text-white hover:border-white transition text-sm">
            Xem trước
          </button>
          <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition text-sm">
            Xuất bản
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- CỘT TRÁI: EDITOR --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Title Input */}
          <input 
            type="text" 
            placeholder="Tiêu đề bài viết..." 
            className="w-full bg-transparent text-4xl md:text-5xl font-black text-white placeholder-zinc-700 border-none focus:outline-none focus:ring-0 px-0"
          />

          {/* 2. Rich Text Editor (Giả lập) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden min-h-125 flex flex-col">
            
            {/* Toolbar */}
            <div className="bg-black border-b border-zinc-800 p-3 flex gap-2 flex-wrap sticky top-0 z-10">
              {['Bold', 'Italic', 'Underline', 'H1', 'H2', 'Quote', 'Link', 'Image'].map((tool) => (
                <button key={tool} className="px-3 py-1.5 rounded hover:bg-zinc-800 text-gray-400 hover:text-white text-xs font-bold border border-transparent hover:border-zinc-700 transition">
                  {tool}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <textarea 
              className="w-full flex-1 bg-transparent p-6 text-gray-300 text-lg leading-relaxed focus:outline-none resize-none placeholder-zinc-700"
              placeholder="Nội dung bài viết bắt đầu tại đây..."
            ></textarea>
          </div>

          {/* 3. SEO Settings */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>🔍</span> Tối ưu SEO
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Meta Title</label>
                <input type="text" className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none text-sm" placeholder="Tiêu đề hiển thị trên Google..." />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Meta Description</label>
                <textarea className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none text-sm h-20 resize-none" placeholder="Mô tả ngắn gọn khoảng 160 ký tự..."></textarea>
              </div>
            </div>
          </div>

        </div>

        {/* --- CỘT PHẢI: SETTINGS --- */}
        <div className="space-y-6">
          
          {/* 4. Publish Settings */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Cài đặt đăng</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Trạng thái</span>
                <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-xs font-bold">Bản nháp</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Hiển thị</span>
                <select className="bg-black border border-zinc-700 rounded text-xs px-2 py-1 text-white focus:outline-none">
                  <option>Công khai</option>
                  <option>Riêng tư</option>
                </select>
              </div>
              <div className="pt-4 border-t border-zinc-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded bg-black border-zinc-700 text-blue-600" />
                  <span className="text-sm text-gray-300">Ghim lên đầu trang chủ</span>
                </label>
              </div>
            </div>
          </div>

          {/* 5. Categories & Tags */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Phân loại</h3>
            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold text-white mb-2">Chuyên mục</label>
              {['Tin công nghệ', 'Review sản phẩm', 'Thủ thuật', 'Khuyến mãi'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="category" className="bg-black border-zinc-700 text-blue-600 focus:ring-0" />
                  <span className="text-gray-400 group-hover:text-white transition text-sm">{cat}</span>
                </label>
              ))}
            </div>
            <div>
               <label className="block text-xs font-bold text-white mb-2">Tags</label>
               <input type="text" placeholder="iphone, apple, ios..." className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none" />
            </div>
          </div>

          {/* 6. Featured Image */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Ảnh đại diện</h3>
            <div className="border-2 border-dashed border-zinc-700 rounded-xl aspect-video flex flex-col items-center justify-center hover:bg-zinc-800 hover:border-zinc-500 transition cursor-pointer relative overflow-hidden group">
              <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
              
              {coverImage ? (
                <>
                  <img src={coverImage} className="absolute inset-0 w-full h-full object-cover" alt="Cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition z-10">
                    <span className="text-white font-bold text-sm">Thay đổi ảnh</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-2xl mb-2">🖼️</span>
                  <span className="text-xs text-gray-500 font-bold">Tải ảnh bìa</span>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}