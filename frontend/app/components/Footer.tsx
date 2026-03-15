// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4">
        
        {/* Phần trên: Chia 4 cột */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Cột 1: Thông tin chung */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">NextStore.</h3>
            <p className="text-sm text-gray-400">
              Nền tảng thương mại điện tử hàng đầu. Mua sắm thông minh, giao hàng thần tốc.
            </p>
          </div>

          {/* Cột 2: Đường dẫn nhanh */}
          <div>
            <h4 className="text-white font-semibold mb-4">Khám phá</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Điều khoản</a></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Liên hệ</a></li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký nhận tin */}
          <div>
            <h4 className="text-white font-semibold mb-4">Nhận tin mới</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email của bạn..." 
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 text-sm"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition">
                Gửi
              </button>
            </div>
          </div>
        </div>

        {/* Phần dưới: Bản quyền */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2024 NextStore Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {/* Giả lập icon mạng xã hội bằng text cho nhẹ */}
            <span className="cursor-pointer hover:text-white transition">Facebook</span>
            <span className="cursor-pointer hover:text-white transition">Twitter</span>
            <span className="cursor-pointer hover:text-white transition">Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
}