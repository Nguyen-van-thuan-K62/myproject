'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Đăng ký plugin ScrollTrigger để làm hiệu ứng cuộn cho phần Gợi ý
gsap.registerPlugin(ScrollTrigger);

// --- 1. DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
const productData: any = {
  "iphone-15": {
    name: "iPhone 15 Pro Max",
    price: "$1,199",
    desc: "Khung titan đẳng cấp chuẩn hàng không vũ trụ. Chip A17 Pro thay đổi cuộc chơi. Nút Action hoàn toàn mới.",
    images: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
      "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=800&q=80"
    ],
    colors: ["Titan Tự nhiên", "Titan Xanh", "Titan Đen", "Titan Trắng"],
    storage: ["256GB", "512GB", "1TB"],
    specs: [
      { k: "Màn hình", v: "6.7\" Super Retina XDR" },
      { k: "Chip", v: "A17 Pro (3nm)" },
      { k: "Camera", v: "48MP Main | Ultra Wide | 5x Telephoto" },
      { k: "Pin", v: "29 giờ xem video" }
    ]
  },
  "default": { // Dữ liệu mặc định nếu không tìm thấy ID
    name: "Sản phẩm Demo Cao Cấp",
    price: "$999",
    desc: "Sản phẩm công nghệ với thiết kế vượt thời gian, hiệu năng mạnh mẽ và trải nghiệm người dùng đỉnh cao.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-d1a635561729?w=800&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&q=80"
    ],
    colors: ["Bạc ánh kim", "Xám không gian", "Vàng Gold"],
    storage: ["Standard", "Pro", "Ultra"],
    specs: [
      { k: "Chất liệu", v: "Nhôm nguyên khối" },
      { k: "Kết nối", v: "5G, Wi-Fi 6E" },
      { k: "Bảo hành", v: "12 tháng chính hãng" }
    ]
  }
};

const relatedProducts = [
  { id: "macbook-pro", name: "MacBook Pro M3", price: "$1,599", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500&q=80", cat: "Laptop" },
  { id: "sony-xm5", name: "Sony WH-1000XM5", price: "$349", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80", cat: "Audio" },
  { id: "apple-watch", name: "Apple Watch Ultra 2", price: "$799", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", cat: "Watch" },
  { id: "ipad-pro", name: "iPad Pro M4", price: "$999", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80", cat: "Tablet" },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lấy dữ liệu sản phẩm (nếu không có thì lấy default)
  const product = productData[params.id] || productData["default"];

  // State quản lý giao diện
  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("desc"); // desc | specs | reviews

  // --- 2. ANIMATION GSAP ---
  useGSAP(() => {
    // Animation 1: Gallery bay vào
    gsap.from(".product-gallery", { 
      x: -50, 
      opacity: 0, 
      duration: 1, 
      ease: "power2.out" 
    });
    
    // Animation 2: Info bay vào (Stagger từng dòng)
    gsap.from(".product-info > *", { 
      x: 50, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.1, 
      delay: 0.2 
    });

    // Animation 3: Related Products (Cuộn tới mới hiện)
    gsap.from(".related-card", {
      scrollTrigger: {
        trigger: ".related-section",
        start: "top 80%", // Khi đỉnh section chạm 80% màn hình
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen font-sans pb-20 pt-24 selection:bg-blue-500 selection:text-white">
      
      {/* BREADCRUMB NAV */}
      <div className="container mx-auto px-6 mb-8 text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-white transition">Trang chủ</Link>
        <span className="mx-2 text-zinc-700">/</span>
        <Link href="/san-pham" className="hover:text-white transition">Sản phẩm</Link>
        <span className="mx-2 text-zinc-700">/</span>
        <span className="text-blue-500 font-bold">{product.name}</span>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* --- LEFT COLUMN: IMAGE GALLERY (Sticky) --- */}
        <div className="product-gallery lg:sticky lg:top-28 h-fit">
          {/* Main Image */}
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 mb-6 h-96 md:h-125 relative group shadow-2xl">
            <img 
              src={activeImg} 
              alt="Main Product" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {/* Tag giảm giá */}
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              -15% OFF
            </div>
            {/* Nút Zoom giả lập */}
            <button className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-black transition">
              🔍
            </button>
          </div>

          {/* Thumbnails List */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer
                  ${activeImg === img ? 'border-blue-500 opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}
                `}
              >
                <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN: PRODUCT INFO --- */}
        <div className="product-info">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{product.name}</h1>
          
          {/* Price & Rating */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-blue-400">{product.price}</span>
              <span className="text-xl text-gray-600 line-through mb-1">$1,299</span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
              <span>★★★★★</span>
              <span className="text-gray-500 ml-1">(128 reviews)</span>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-10 text-lg">
            {product.desc}
          </p>

          {/* Option: Colors */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
              Màu sắc: <span className="text-white ml-2">{product.colors[selectedColor]}</span>
            </h3>
            <div className="flex gap-4">
              {product.colors.map((color: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative
                    ${selectedColor === idx ? 'border-blue-500 scale-110' : 'border-zinc-700 hover:border-white hover:scale-105'}
                  `}
                  title={color}
                >
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: ['#5a5a5a', '#2d3436', '#f1f2f6', '#e17055'][idx % 4] }} // Màu giả lập
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Option: Storage */}
          <div className="mb-10">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Dung lượng</h3>
            <div className="flex flex-wrap gap-3">
              {product.storage.map((store: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedStorage(idx)}
                  className={`px-8 py-4 rounded-xl border font-bold text-sm transition-all duration-300
                    ${selectedStorage === idx 
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                      : 'bg-transparent text-gray-400 border-zinc-800 hover:border-white hover:text-white'}
                  `}
                >
                  {store}
                </button>
              ))}
            </div>
          </div>

          {/* Actions: Quantity & Add Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            {/* Quantity */}
            <div className="flex items-center bg-zinc-900 rounded-full border border-zinc-700 px-6 py-4 w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl hover:text-blue-500 transition">-</button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-xl hover:text-blue-500 transition">+</button>
            </div>

            {/* Main Button */}
            <button className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold text-lg py-4 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] hover:scale-[1.02] transition-all transform flex items-center justify-center gap-3 active:scale-95">
              <span>🛒</span> Thêm vào giỏ hàng
            </button>
          </div>

          {/* --- 3. TABS SECTION (DETAILS) --- */}
          <div className="border-t border-white/10 pt-10">
            <div className="flex gap-10 mb-8 border-b border-white/10">
              {["desc", "specs", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative
                    ${activeTab === tab ? 'text-blue-500' : 'text-gray-500 hover:text-white'}
                  `}
                >
                  {tab === "desc" ? "Mô tả" : tab === "specs" ? "Thông số" : "Đánh giá"}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></span>}
                </button>
              ))}
            </div>

            <div className="min-h-50 text-gray-400 leading-relaxed">
              {activeTab === "desc" && (
                <div className="animate-fade-in space-y-4">
                  <p className="text-xl font-bold text-white mb-2">Đỉnh cao thiết kế mới</p>
                  <p>iPhone 15 Pro Max là chiếc iPhone đầu tiên có thiết kế từ titan chuẩn hàng không vũ trụ. Hợp kim này có tỷ lệ độ bền trên trọng lượng cao nhất trong các kim loại, giúp đây là mẫu Pro nhẹ nhất từng có.</p>
                  <p className="mt-4 text-xl font-bold text-white mb-2">Sức mạnh A17 Pro</p>
                  <p>Chip A17 Pro mang lại hiệu năng đồ họa tốt nhất từ trước đến nay. Đây là một con quái vật về hiệu năng chơi game di động, với Ray Tracing tốc độ phần cứng nhanh gấp 4 lần.</p>
                </div>
              )}
              {activeTab === "specs" && (
                <div className="animate-fade-in">
                  <table className="w-full text-left">
                    <tbody>
                      {product.specs?.map((spec: any, idx: number) => (
                         <tr key={idx} className="border-b border-zinc-800">
                           <td className="py-4 text-gray-500 font-medium w-1/3">{spec.k}</td>
                           <td className="py-4 text-white font-bold">{spec.v}</td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="animate-fade-in space-y-6">
                  {[1, 2].map((review) => (
                    <div key={review} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">A</div>
                          <div>
                            <p className="font-bold text-white text-sm">Khách hàng ẩn danh</p>
                            <p className="text-xs text-gray-500">Mua ngày 10/02/2026</p>
                          </div>
                        </div>
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                      </div>
                      <p className="text-sm text-gray-300">"Sản phẩm quá tuyệt vời, đóng gói cẩn thận. Shop giao hàng siêu nhanh trong 2h. Sẽ ủng hộ dài dài!"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* --- 4. RELATED PRODUCTS (GỢI Ý) --- */}
      <section className="related-section container mx-auto px-6 mt-32 border-t border-white/10 pt-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Có thể bạn cũng thích</h2>
            <p className="text-gray-400 text-sm">Đừng bỏ lỡ những deal hời này.</p>
          </div>
          <Link href="/san-pham" className="text-blue-500 font-bold hover:underline">
            Xem tất cả &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {relatedProducts.map((item) => (
            <Link 
              key={item.id} 
              href={`/san-pham/${item.id}`}
              className="related-card group block"
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-300 relative h-full flex flex-col">
                
                {/* Ảnh sản phẩm */}
                <div className="relative h-64 overflow-hidden bg-white/5 p-4">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Badge Category */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold border border-white/10">
                    {item.cat}
                  </div>
                  {/* Overlay Quick View */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      Xem ngay
                    </span>
                  </div>
                </div>

                {/* Thông tin */}
                <div className="p-5 mt-auto">
                  <h3 className="font-bold text-white text-lg mb-2 truncate group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2 border-t border-white/10 pt-4">
                    <span className="text-xl font-bold text-white">{item.price}</span>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition text-lg">
                      +
                    </button>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}