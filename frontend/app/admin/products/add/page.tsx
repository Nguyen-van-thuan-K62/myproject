'use client';

import { useState } from "react";
import Link from "next/link";

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);

  // Giả lập upload ảnh
  const handleImageUpload = (e: any) => {
    // Trong thực tế, đoạn này sẽ upload lên Cloudinary/AWS S3
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setImages([...images, fakeUrl]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-zinc-700 transition">
            ←
          </Link>
          <h1 className="text-3xl font-black text-white">Thêm sản phẩm mới</h1>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl border border-zinc-700 text-gray-400 font-bold hover:text-white hover:border-white transition">
            Lưu nháp
          </button>
          <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition">
            Xuất bản ngay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- CỘT TRÁI: THÔNG TIN CHÍNH --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Tên & Mô tả */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Thông tin cơ bản</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tên sản phẩm</label>
                <input type="text" placeholder="Ví dụ: iPhone 16 Pro Max..." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mô tả chi tiết</label>
                <textarea placeholder="Viết gì đó thật hay ho..." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition h-40 resize-none"></textarea>
                <p className="text-xs text-gray-500 mt-2 text-right">0/5000 ký tự</p>
              </div>
            </div>
          </div>

          {/* 2. Giá & Tồn kho */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Dữ liệu bán hàng</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Giá bán ($)</label>
                <input type="number" placeholder="1200" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Giá gốc (để so sánh)</label>
                <input type="number" placeholder="1500" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mã SKU</label>
                <input type="text" placeholder="IP16-PM-256" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Số lượng tồn kho</label>
                <input type="number" placeholder="100" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition" />
              </div>
            </div>
          </div>

          {/* 3. Biến thể (Variants) */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Biến thể (Màu/Size)</h3>
                <button className="text-blue-500 text-sm font-bold hover:underline">+ Thêm tùy chọn</button>
             </div>
             <div className="bg-black/50 rounded-xl p-4 border border-zinc-800 border-dashed text-center text-gray-500 text-sm">
                Chưa có biến thể nào. Hãy thêm màu sắc hoặc kích thước.
             </div>
          </div>
        </div>

        {/* --- CỘT PHẢI: MEDIA & PHÂN LOẠI --- */}
        <div className="space-y-8">
          
          {/* 4. Upload Ảnh */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Hình ảnh</h3>
            
            {/* Vùng Dropzone */}
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-500/5 transition cursor-pointer relative">
               <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
               <div className="text-4xl mb-2">📷</div>
               <p className="text-sm font-bold text-gray-300">Kéo thả hoặc click để tải ảnh</p>
               <p className="text-xs text-gray-500 mt-1">Hỗ trợ JPG, PNG, WEBP</p>
            </div>

            {/* List ảnh đã up */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover" alt="Preview" />
                    <button className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Danh mục */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Phân loại</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Danh mục chính</label>
                <select className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none appearance-none">
                  <option>Điện thoại</option>
                  <option>Laptop</option>
                  <option>Âm thanh</option>
                  <option>Phụ kiện</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tags</label>
                <input type="text" placeholder="Nhập tag rồi Enter..." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}