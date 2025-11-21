"use client";

import { Lock, Shield, Eye, Database, UserCheck, AlertCircle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-linear-to-r from-cyan-600/10 to-blue-600/10 border-b border-cyan-500/30 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-cyan-400" size={40} />
            <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Chính Sách Bảo Mật
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Tìm hiểu cách chúng tôi thu thập và sử dụng dữ liệu.
          </p>
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Last Updated */}
          <div className="bg-linear-to-br from-cyan-900/30 to-blue-900/30 p-6 rounded-lg border border-cyan-500/30 flex items-start gap-3">
            <AlertCircle className="text-cyan-400 shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-white">Cập nhật lần cuối: 01/01/2025</p>
              <p className="text-sm text-gray-400 mt-1">
                Chính sách này có thể thay đổi theo thời gian. Chúng tôi sẽ thông báo cho bạn về các thay đổi lớn.
              </p>
            </div>
          </div>

          {/* Quick Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Eye, title: "Minh Bạch", desc: "Chúng tôi sáng suốt về cách sử dụng dữ liệu" },
              { icon: Shield, title: "Bảo Vệ", desc: "Dữ liệu được mã hóa và bảo vệ tối đa" },
              { icon: UserCheck, title: "Kiểm Soát", desc: "Bạn kiểm soát dữ liệu cá nhân của mình" },
              { icon: Database, title: "Lưu Trữ", desc: "Dữ liệu được lưu trữ an toàn trên máy chủ" },
            ].map((item, idx) => (
              <div key={idx} className="bg-linear-to-br from-cyan-900/30 to-blue-900/30 p-4 rounded-lg border border-cyan-500/30 flex gap-3">
                <item.icon className="text-cyan-400 shrink-0" size={20} />
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Sections */}
          <div className="space-y-4">
            {[
              {
                title: "1. Thông Tin Chúng Tôi Thu Thập",
                content:
                  "Chúng tôi thu thập các loại thông tin sau: (a) Thông tin cá nhân: tên, email, ngày sinh, địa chỉ; (b) Thông tin tài khoản: tên người dùng, mật khẩu (mã hóa); (c) Thông tin kỹ thuật: địa chỉ IP, trình duyệt, hệ điều hành; (d) Dữ liệu hoạt động: lịch sử trò chơi, điểm số, thời gian chơi.",
              },
              {
                title: "2. Cách Chúng Tôi Sử Dụng Dữ Liệu",
                content:
                  "Dữ liệu được sử dụng để: (a) Cung cấp dịch vụ game; (b) Cải thiện trải nghiệm người dùng; (c) Gửi thông báo và cập nhật; (d) Phân tích hành vi người dùng; (e) Phát hiện gian lận; (f) Tuân thủ luật pháp. Chúng tôi KHÔNG bán hoặc chia sẻ dữ liệu cá nhân cho bên thứ ba.",
              },
              {
                title: "3. Bảo Vệ Dữ Liệu",
                content:
                  "Chúng tôi sử dụng các biện pháp bảo vệ: (a) Mã hóa SSL/TLS cho tất cả truyền dữ liệu; (b) Mật khẩu được mã hóa bằng bcrypt; (c) Tường lửa và hệ thống phát hiện xâm nhập; (d) Kiểm tra bảo mật thường xuyên; (e) Nhân viên được đào tạo về bảo mật dữ liệu.",
              },
              {
                title: "4. Cookie và Theo Dõi",
                content:
                  "Gami sử dụng cookie để: (a) Ghi nhớ thông tin đăng nhập; (b) Theo dõi tùy chọn người dùng; (c) Phân tích lưu lượng truy cập. Bạn có thể vô hiệu hóa cookie trong cài đặt trình duyệt. Lưu ý: vô hiệu hóa cookie có thể ảnh hưởng đến chức năng của dịch vụ.",
              },
              {
                title: "5. Quyền Của Người Dùng",
                content:
                  "Bạn có quyền: (a) Truy cập dữ liệu cá nhân của mình; (b) Yêu cầu chỉnh sửa thông tin không chính xác; (c) Yêu cầu xóa dữ liệu; (d) Rút lại sự đồng ý xử lý dữ liệu; (e) Yêu cầu sao chép dữ liệu. Để thực hiện, liên hệ privacy@gami.vn.",
              },
              {
                title: "6. Chia Sẻ Dữ Liệu",
                content:
                  "Chúng tôi chỉ chia sẻ dữ liệu trong các trường hợp: (a) Nhà cung cấp dịch vụ (lưu trữ, email); (b) Tuân thủ luật pháp; (c) Bảo vệ quyền của chúng tôi; (d) Với sự đồng ý của bạn. Các bên thứ ba phải ký hợp đồng bảo mật dữ liệu.",
              },
              {
                title: "7. Lưu Giữ Dữ Liệu",
                content:
                  "Chúng tôi lưu giữ dữ liệu của bạn cho đến khi: (a) Tài khoản hoạt động; (b) Cần thiết để tuân thủ luật; (c) Giải quyết tranh chấp. Khi xóa tài khoản, dữ liệu sẽ được xóa vĩnh viễn trong 30 ngày.",
              },
              {
                title: "8. Trẻ Em & Người Dưới 18 Tuổi",
                content:
                  "Gami không có ý định thu thập dữ liệu từ trẻ em dưới 13 tuổi. Nếu phát hiện, chúng tôi sẽ xóa thông tin ngay lập tức. Người dùng từ 13-18 tuổi cần sự đồng ý của phụ huynh.",
              },
              {
                title: "9. Liên Hệ Với Chúng Tôi",
                content:
                  "Có câu hỏi về chính sách bảo mật? Liên hệ: Email: privacy@gami.vn | Hotline: +84 (123) 456-789 | Địa chỉ: TP. Hồ Chí Minh, Việt Nam. Chúng tôi sẽ phản hồi trong 7 ngày làm việc.",
              },
              {
                title: "10. Thay Đổi Chính Sách",
                content:
                  "Chúng tôi có quyền cập nhật chính sách này bất cứ lúc nào. Thay đổi lớn sẽ được thông báo qua email. Tiếp tục sử dụng dịch vụ sau khi thay đổi có nghĩa bạn đồng ý với chính sách mới.",
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-900/50 to-blue-900/50 p-6 rounded-lg border border-cyan-500/30">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">{section.title}</h3>
                <p className="text-gray-300 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Data Access Request */}
          <div className="bg-linear-to-r from-cyan-600/10 to-blue-600/10 p-8 rounded-lg border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">🔐 Yêu Cầu Truy Cập Dữ Liệu</h2>
            <p className="text-gray-300 mb-6">
              Bạn có quyền yêu cầu bản sao tất cả dữ liệu cá nhân của mình mà chúng tôi lưu giữ.
            </p>
            <button className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
              📥 Yêu Cầu Dữ Liệu Của Tôi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}