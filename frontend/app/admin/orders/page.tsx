'use client';

export default function AdminOrders() {
  const orders = [
    { id: "#NX8821", customer: "Nguyễn Văn A", date: "10/02/2026", total: "$1,199", status: "Completed", items: 2 },
    { id: "#NX8822", customer: "Trần Thị B", date: "11/02/2026", total: "$349", status: "Pending", items: 1 },
    { id: "#NX8823", customer: "Lê Văn C", date: "11/02/2026", total: "$1,599", status: "Shipping", items: 3 },
  ];

  const statusColors: any = {
    Completed: "bg-green-500/20 text-green-500 border-green-500/20",
    Pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20",
    Shipping: "bg-blue-500/20 text-blue-500 border-blue-500/20",
    Cancelled: "bg-red-500/20 text-red-500 border-red-500/20",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-black text-white">Đơn hàng</h1>
      
      {/* Filter Bar */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {["Tất cả", "Chờ xử lý", "Đang giao", "Hoàn thành", "Đã hủy"].map((status) => (
          <button key={status} className="px-4 py-2 rounded-full border border-zinc-700 hover:bg-white hover:text-black transition text-sm font-bold text-gray-400 whitespace-nowrap">
            {status}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black text-white uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Mã đơn</th>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Ngày đặt</th>
              <th className="px-6 py-4">Tổng tiền</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition">
                <td className="px-6 py-4 font-mono text-white">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-white">{order.customer}</div>
                  <div className="text-xs">{order.items} sản phẩm</div>
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 font-bold text-white">{order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-white transition">Xem &rarr;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}