'use client';

import { useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function BlogDetailPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const post = {
    title: "Tương lai của Metaverse: Bong bóng hay Kỷ nguyên mới?",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
  };

  useGSAP(() => {

    // ===== Progress Bar =====
    gsap.to(".progress-bar", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // ===== Split Title Animation =====
    const split = new SplitType(".split-title", { types: "chars" });

    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 1,
      ease: "power4.out"
    });

    // ===== Hero Parallax =====
    gsap.to(".hero-img", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        scrub: true
      }
    });

    // ===== Fade Up Sections =====
    gsap.utils.toArray(".fade-section").forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%"
        },
        y: 80,
        opacity: 0,
        duration: 1
      });
    });

    // ===== Quote Big Reveal =====
    gsap.from(".big-quote", {
      scrollTrigger: {
        trigger: ".big-quote",
        start: "top 80%"
      },
      scale: 0.8,
      opacity: 0,
      duration: 1
    });

    // ===== Related Stagger =====
    gsap.from(".related-card", {
      scrollTrigger: {
        trigger: ".related",
        start: "top 85%"
      },
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen relative">

      {/* Progress */}
      <div className="progress-bar fixed top-0 left-0 h-1 bg-blue-500 z-50 w-0"></div>

      {/* HERO */}
      <section className="hero relative h-screen flex items-center justify-center overflow-hidden text-center">
        <img
          src={post.image}
          className="hero-img absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-5xl px-6">
          <Link href="/blog" className="text-gray-400 text-sm hover:text-white transition">
            ← Quay lại
          </Link>

          <h1 className="split-title text-5xl md:text-7xl font-black leading-tight mt-6">
            {post.title}
          </h1>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-[250px_1fr] gap-16">

        {/* Sticky TOC */}
        <aside className="hidden lg:block sticky top-32 h-fit text-sm space-y-4 text-gray-500">
          <h4 className="text-white font-bold mb-4">Nội dung</h4>
          <div className="space-y-2">
            <a href="#section1" className="block hover:text-white">Giới thiệu</a>
            <a href="#section2" className="block hover:text-white">Cơ hội</a>
            <a href="#section3" className="block hover:text-white">Thách thức</a>
          </div>
        </aside>

        {/* ARTICLE */}
        <article className="space-y-24 text-gray-300 text-lg leading-relaxed">

            {/* INTRO */}
            <section id="section1" className="fade-section space-y-6">
                <p>
                Metaverse từng được tung hô như tương lai của Internet. Từ những buổi
                thuyết trình hoành tráng của Meta cho đến những khoản đầu tư hàng tỷ đô
                từ các quỹ công nghệ, mọi thứ đều cho thấy một viễn cảnh nơi con người
                sống, làm việc và giải trí trong không gian số.
                </p>

                <p>
                Nhưng sau cơn sốt ban đầu, thị trường bắt đầu đặt câu hỏi:
                liệu đây là một cuộc cách mạng thực sự hay chỉ là một bong bóng?
                </p>
            </section>

            {/* IMAGE 1 FULL WIDTH */}
            <section className="fade-section">
                <div className="overflow-hidden rounded-3xl">
                <img
                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600"
                    className="article-image w-full hover:scale-105 transition-transform duration-2000"
                />
                </div>
            </section>

            {/* DEVELOPMENT */}
            <section id="section2" className="fade-section space-y-6">
                <h2 className="text-4xl font-bold text-white">
                Sự phát triển thần tốc
                </h2>

                <p>
                Chỉ trong vòng 3 năm, công nghệ thực tế ảo (VR) và thực tế tăng cường (AR)
                đã tiến những bước dài. Apple Vision Pro, Meta Quest và hàng loạt thiết bị
                mới đã thay đổi cách chúng ta tương tác với nội dung số.
                </p>

                <p>
                Các công ty không còn chỉ nói về game. Họ nói về văn phòng ảo,
                lớp học 3D, và cả bệnh viện trong không gian số.
                </p>
            </section>

            {/* 2 IMAGES SIDE BY SIDE */}
            <section className="fade-section grid md:grid-cols-2 gap-8">
                <div className="overflow-hidden rounded-2xl">
                <img
                    src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200"
                    className="w-full hover:scale-110 transition-transform duration-1000"
                />
                </div>
                <div className="overflow-hidden rounded-2xl">
                <img
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200"
                    className="w-full hover:scale-110 transition-transform duration-1000"
                />
                </div>
            </section>

            {/* QUOTE */}
            <section className="big-quote text-center py-24">
                <h3 className="text-5xl md:text-6xl font-black text-white leading-tight">
                “Công nghệ không tạo ra tương lai.
                <br /> Con người mới là yếu tố quyết định.”
                </h3>
            </section>

            {/* CHALLENGES */}
            <section id="section3" className="fade-section space-y-6">
                <h2 className="text-4xl font-bold text-white">
                Những rào cản lớn nhất
                </h2>

                <p>
                Phần cứng vẫn còn đắt đỏ. Một bộ VR cao cấp có giá ngang một chiếc laptop
                gaming. Điều này khiến việc phổ cập đại trà trở nên khó khăn.
                </p>

                <p>
                Ngoài ra, vấn đề bảo mật và quyền riêng tư trong môi trường ảo
                cũng là mối quan tâm hàng đầu.
                </p>
            </section>

            {/* LARGE CINEMATIC IMAGE */}
            <section className="fade-section">
                <div className="overflow-hidden rounded-3xl">
                <img
                    src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1600"
                    className="w-full hover:scale-105 transition-transform duration-2000"
                />
                </div>
            </section>

            {/* FUTURE */}
            <section id="section4" className="fade-section space-y-6">
                <h2 className="text-4xl font-bold text-white">
                Vậy tương lai sẽ ra sao?
                </h2>

                <p>
                Metaverse có thể không bùng nổ ngay lập tức. Nhưng giống như Internet
                những năm 2000, nó cần thời gian để hoàn thiện hạ tầng.
                </p>

                <p>
                Có thể trong 5 năm tới, chúng ta sẽ không còn nói “đăng nhập Metaverse”.
                Thay vào đó, nó sẽ trở thành một phần tự nhiên của cuộc sống số.
                </p>

                <p className="text-blue-400 font-semibold">
                Và khi đó, câu hỏi không còn là “Có nên tham gia không?”
                mà là “Bạn đã sẵn sàng chưa?”
                </p>
            </section>

        </article>
      </div>

      {/* RELATED */}
      <section className="related max-w-6xl mx-auto px-6 pb-32">
        <h3 className="text-3xl font-bold mb-12">Bài viết liên quan</h3>

        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div key={item} className="related-card group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src={`https://picsum.photos/600/400?random=${item}`}
                  className="group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h4 className="font-bold text-lg group-hover:text-blue-500 transition">
                Công nghệ VR sẽ thay đổi giáo dục?
              </h4>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}