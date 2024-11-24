import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/" className="inline-block transform hover:scale-105 transition-transform duration-200">
            <div className="text-2xl text-green-500 tracking-wide hover:text-green-600">H2O Shop</div>
          </Link>
          <p className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
            123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110
          </p>
          <span className="font-semibold hover:text-green-500 transition-colors duration-200 cursor-pointer">contact@thaishop.com</span>
          <span className="font-semibold hover:text-green-500 transition-colors duration-200 cursor-pointer">02-123-4567</span>
          <div className="flex gap-6">
            {[
              { src: "/facebook.png", alt: "facebook" },
              { src: "/instagram.png", alt: "instagram" },
              { src: "/youtube.png", alt: "youtube" },
              { src: "/pinterest.png", alt: "pinterest" },
              { src: "/x.png", alt: "twitter" }
            ].map((social) => (
              <div key={social.alt} className="transform hover:scale-125 transition-transform duration-200 cursor-pointer">
                <Image src={social.src} alt={social.alt} width={16} height={16} />
              </div>
            ))}
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          {[
            {
              title: "เกี่ยวกับเรา",
              links: ["ประวัติบริษัท", "ร่วมงานกับเรา", "พันธมิตรทางธุรกิจ", "บทความ", "ติดต่อเรา"]
            },
            {
              title: "ช้อปปิ้ง",
              links: ["สินค้ามาใหม่", "เครื่องประดับ", "แฟชั่นผู้ชาย", "แฟชั่นผู้หญิง", "สินค้าทั้งหมด"]
            },
            {
              title: "ช่วยเหลือ",
              links: ["บริการลูกค้า", "บัญชีของฉัน", "ค้นหาร้านค้า", "นโยบายและความเป็นส่วนตัว", "บัตรของขวัญ"]
            }
          ].map((section) => (
            <div key={section.title} className="flex flex-col justify-between">
              <h1 className="font-medium text-lg text-gray-800 hover:text-green-500 transition-colors duration-200">{section.title}</h1>
              <div className="flex flex-col gap-6">
                {section.links.map((link) => (
                  <Link 
                    href="" 
                    key={link}
                    className="text-gray-600 hover:text-green-500 hover:translate-x-1 transform transition-all duration-200"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg text-gray-800 hover:text-green-500 transition-colors duration-200">รับข่าวสาร</h1>
          <p className="text-gray-600">
            รับข่าวสารเกี่ยวกับเทรนด์ใหม่ โปรโมชั่น และอื่นๆ อีกมากมาย!
          </p>
          <div className="flex group">
            <input
              type="text"
              placeholder="อีเมลของคุณ"
              className="p-4 w-3/4 border border-gray-200 focus:border-green-500 focus:outline-none transition-colors duration-200"
            />
            <button className="w-1/4 bg-primary text-white hover:bg-green-600 transition-colors duration-200 group-hover:shadow-lg">สมัคร</button>
          </div>
          <span className="font-semibold text-gray-800">ช่องทางการชำระเงินที่ปลอดภัย</span>
          <div className="flex justify-between">
            {[
              { src: "/discover.png", alt: "discover" },
              { src: "/skrill.png", alt: "skrill" },
              { src: "/paypal.png", alt: "paypal" },
              { src: "/mastercard.png", alt: "mastercard" },
              { src: "/visa.png", alt: "visa" }
            ].map((payment) => (
              <div key={payment.alt} className="transform hover:scale-110 transition-transform duration-200">
                <Image src={payment.src} alt={payment.alt} width={40} height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16 border-t border-gray-200 pt-8">
        <div className="text-gray-600 hover:text-gray-800 transition-colors duration-200"> 2024 H2O Shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
            <span className="text-gray-500 mr-4">ภาษา</span>
            <span className="font-medium">ไทย | Thai</span>
          </div>
          <div className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
            <span className="text-gray-500 mr-4">สกุลเงิน</span>
            <span className="font-medium">฿ THB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
