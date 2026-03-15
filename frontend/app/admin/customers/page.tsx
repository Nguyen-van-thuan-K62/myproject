'use client';

export default function AdminCustomers() {
  const customers = [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", spent: "$5,200", orders: 12, joined: "2025" },
    { id: 2, name: "Trần Thị B", email: "tranthib@gmail.com", spent: "$1,200", orders: 3, joined: "2026" },
    { id: 3, name: "Lê Văn C", email: "levanc@gmail.com", spent: "$8,500", orders: 24, joined: "2024" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <h1 className="text-3xl font-black text-white">Khách hàng</h1>
         <input type="text" placeholder="Tìm kiếm email, sđt..." className="bg-black border border-zinc-800 px-4 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500" />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black text-white uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Thông tin</th>
              <th className="px-6 py-4">Liên hệ</th>
              <th className="px-6 py-4">Số đơn</th>
              <th className="px-6 py-4">Tổng chi tiêu</th>
              <th className="px-6 py-4 text-right">Ngày tham gia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-white/5 transition">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                    {c.name.charAt(0)}
                  </div>
                  <span className="font-bold text-white">{c.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-300">{c.email}</td>
                <td className="px-6 py-4">{c.orders}</td>
                <td className="px-6 py-4 font-bold text-green-500">{c.spent}</td>
                <td className="px-6 py-4 text-right">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}