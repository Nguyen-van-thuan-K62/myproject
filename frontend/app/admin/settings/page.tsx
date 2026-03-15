'use client';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <h1 className="text-3xl font-black text-white">Cài đặt hệ thống</h1>

      {/* General Settings */}
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
        <h3 className="text-xl font-bold mb-6 text-white">Thông tin chung</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Tên Website</label>
            <input type="text" defaultValue="NextStore." className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Hotline</label>
            <input type="text" defaultValue="1900 6969" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Mô tả (SEO)</label>
            <textarea className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none h-24" defaultValue="Hệ thống bán lẻ công nghệ hàng đầu Việt Nam..."></textarea>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
        <h3 className="text-xl font-bold mb-6 text-white">Cấu hình thanh toán</h3>
        <div className="space-y-4">
          {["Cho phép thanh toán tiền mặt (COD)", "Cho phép chuyển khoản ngân hàng", "Bật cổng thanh toán Momo"].map((opt, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-zinc-700 bg-black text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-300 group-hover:text-white transition">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 rounded-xl border border-zinc-700 text-gray-400 hover:text-white hover:border-white transition font-bold">Hủy bỏ</button>
        <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition">Lưu thay đổi</button>
      </div>
    </div>
  );
}