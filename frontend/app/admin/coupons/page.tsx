'use client';

export default function AdminCoupons() {
  const coupons = [
    { code: "NEXTJS2026", discount: "10%", type: "Percent", status: "Active", used: 120 },
    { code: "FREESHIP", discount: "$20", type: "Fixed", status: "Active", used: 55 },
    { code: "BLACKFRIDAY", discount: "50%", type: "Percent", status: "Expired", used: 800 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-white">Mã giảm giá</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
          + Tạo mã mới
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black text-white uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Mã Code</th>
              <th className="px-6 py-4">Giảm giá</th>
              <th className="px-6 py-4">Loại</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Đã dùng</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {coupons.map((c, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="px-6 py-4 font-mono font-bold text-blue-400">{c.code}</td>
                <td className="px-6 py-4 text-white font-bold">{c.discount}</td>
                <td className="px-6 py-4">{c.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4">{c.used} lần</td>
                <td className="px-6 py-4 text-right">
                   <button className="text-gray-400 hover:text-white">Sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}