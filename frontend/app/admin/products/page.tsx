'use client';

export default function AdminProducts() {
  const products = [
    { id: 1, name: "iPhone 15 Pro Max", price: "$1,199", stock: 12, category: "Smartphone", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=100&q=80" },
    { id: 2, name: "MacBook Air M3", price: "$1,099", stock: 5, category: "Laptop", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=100&q=80" },
    { id: 3, name: "Sony WH-1000XM5", price: "$349", stock: 0, category: "Audio", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-white">Sản phẩm</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
          + Thêm mới
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black text-white uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Giá</th>
              <th className="px-6 py-4">Tồn kho</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img src={p.img} className="w-12 h-12 rounded-lg object-cover bg-white/5" alt="" />
                  <span className="font-bold text-white">{p.name}</span>
                </td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">{p.category}</span></td>
                <td className="px-6 py-4 font-bold text-white">{p.price}</td>
                <td className="px-6 py-4">
                  {p.stock > 0 ? (
                    <span className="text-green-500 font-bold">{p.stock} sẵn hàng</span>
                  ) : (
                    <span className="text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded">Hết hàng</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-blue-500 hover:text-white transition">Sửa</button>
                  <button className="text-red-500 hover:text-white transition">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}