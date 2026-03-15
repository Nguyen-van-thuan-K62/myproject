'use client';

export default function AdminDashboard() {
  
  // Dữ liệu giả lập cho biểu đồ
  const revenueData = [40, 65, 30, 80, 55, 90, 70]; 
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white">Tổng quan</h1>
          <p className="text-gray-400 mt-1">Chào mừng quay trở lại, Admin!</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition">
          + Xuất báo cáo
        </button>
      </div>

      {/* 2. Stats Cards (Thẻ thống kê) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Tổng doanh thu", value: "$12,450", change: "+15%", color: "text-green-500", icon: "💰" },
          { title: "Đơn hàng mới", value: "1,240", change: "+5%", color: "text-blue-500", icon: "📦" },
          { title: "Khách hàng", value: "350", change: "-2%", color: "text-red-500", icon: "👥" },
          { title: "Sản phẩm", value: "85", change: "+12", color: "text-purple-500", icon: "🏷️" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500/30 transition shadow-lg">
            <div className="flex justify-between items-start mb-4">
               <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">{stat.icon}</div>
               <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${stat.color}`}>{stat.change}</span>
            </div>
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wide">{stat.title}</h3>
            <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Bar Chart (CSS thuần) */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6">Biểu đồ doanh thu tuần</h3>
          <div className="flex items-end justify-between h-64 gap-4">
            {revenueData.map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                {/* Cột hiển thị giá trị khi hover */}
                <div className="opacity-0 group-hover:opacity-100 transition text-xs font-bold text-blue-400 mb-1">${h}k</div>
                {/* Thanh Bar */}
                <div 
                  className="w-full bg-zinc-800 rounded-t-lg relative overflow-hidden group-hover:bg-zinc-700 transition-all duration-500"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-blue-600 group-hover:h-full transition-all duration-700 ease-out opacity-80"></div>
                </div>
                {/* Nhãn ngày */}
                <span className="text-xs text-gray-500 font-bold">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Recent Activity */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6">Hoạt động gần đây</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs">
                  NEW
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Đơn hàng #NX{2026 + i}</p>
                  <p className="text-xs text-gray-500">Vừa đặt 5 phút trước</p>
                </div>
                <div className="ml-auto text-sm font-bold text-green-500">+$120</div>
              </div>
            ))}
            <button className="w-full py-3 mt-4 text-sm font-bold text-gray-400 hover:text-white border border-dashed border-zinc-700 rounded-xl hover:border-zinc-500 transition">
              Xem tất cả
            </button>
          </div>
        </div>

      </div>

      {/* 5. Recent Orders Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-xl font-bold">Đơn hàng mới nhất</h3>
          <div className="flex gap-2">
            <input type="text" placeholder="Tìm kiếm..." className="bg-black border border-zinc-700 px-3 py-1.5 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500" />
            <button className="bg-white text-black px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-200">Lọc</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-black text-gray-200 uppercase font-bold text-xs">
              <tr>
                <th className="px-6 py-4">Mã đơn</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                { id: "#NX8821", user: "Nguyễn Văn A", item: "iPhone 15 Pro Max", status: "Success", price: "$1,199" },
                { id: "#NX8822", user: "Trần Thị B", item: "Sony WH-1000XM5", status: "Pending", price: "$349" },
                { id: "#NX8823", user: "Lê Văn C", item: "MacBook Air M3", status: "Shipping", price: "$1,599" },
              ].map((order, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-mono text-blue-400">{order.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{order.user}</td>
                  <td className="px-6 py-4">{order.item}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold 
                      ${order.status === 'Success' ? 'bg-green-500/20 text-green-400' : 
                        order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-white">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}