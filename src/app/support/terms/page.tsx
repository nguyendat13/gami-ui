"use client";

import { FileText, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-linear-to-r from-cyan-600/10 to-blue-600/10 border-b border-cyan-500/30 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-cyan-400" size={40} />
            <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Điều Khoản Dịch Vụ
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Vui lòng đọc kỹ các điều khoản trước khi sử dụng dịch vụ của Gami.
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
                Những thay đổi có thể được thực hiện bất cứ lúc nào. Vui lòng kiểm tra thường xuyên để cập nhật thông tin mới nhất.
              </p>
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-4">
            {[
              {
                title: "1. Chấp Nhận Điều Khoản",
                content:
                  "Bằng cách sử dụng nền tảng Gami, bạn đồng ý tuân theo tất cả các điều khoản và điều kiện được nêu tại đây. Nếu bạn không đồng ý với bất kỳ phần nào, vui lòng không sử dụng dịch vụ của chúng tôi. Gami có quyền thay đổi các điều khoản này bất cứ lúc nào mà không cần thông báo trước.",
              },
              {
                title: "2. Tài Khoản Người Dùng",
                content:
                  "Bạn chịu trách nhiệm duy trì tính bảo mật của tài khoản và mật khẩu của mình. Bạn đồng ý chịu trách nhiệm tất cả các hoạt động xảy ra dưới tài khoản của bạn. Nếu phát hiện hoạt động trái phép, hãy liên hệ ngay với chúng tôi tại support@gami.vn.",
              },
              {
                title: "3. Luật Lệ Cộng Đồng",
                content:
                  "Người dùng không được phép: (a) Xâm nhập hoặc lợi dụng lỗ hổng của nền tảng; (b) Sử dụng bot hoặc phần mềm tự động; (c) Gian lận hoặc sử dụng cheat engine; (d) Qu騷rão, xúc phạm hoặc có hành vi không phù hợp. Vi phạm các luật lệ này sẽ dẫn đến bị cấm tạm thời hoặc vĩnh viễn.",
              },
              {
                title: "4. Sở Hữu Trí Tuệ",
                content:
                  "Tất cả nội dung trên Gami, bao gồm game, đồ họa, âm thanh và text, là tài sản trí tuệ của Gami hoặc các nhà cấp phép của chúng tôi. Bạn không được phép sao chép, sửa đổi hoặc phân phối mà không có sự cho phép.",
              },
              {
                title: "5. Hạn Chế Trách Nhiệm",
                content:
                  "Gami cung cấp dịch vụ 'như hiện tại' mà không có bất kỳ bảo đảm nào. Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, trực tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả phát sinh từ việc sử dụng dịch vụ.",
              },
              {
                title: "6. Thay Đổi Dịch Vụ",
                content:
                  "Gami có quyền sửa đổi, tạm dừng hoặc dừng bất kỳ phần nào của dịch vụ bất cứ lúc nào. Chúng tôi sẽ cố gắng thông báo cho người dùng về các thay đổi lớn với sự báo trước hợp lý.",
              },
              {
                title: "7. Chấm Dứt Tài Khoản",
                content:
                  "Gami có queuee hủy tài khoản hoặc khóa truy cập nếu người dùng vi phạm điều khoản. Người dùng có thể hủy tài khoản của mình bất cứ lúc nào bằng cách liên hệ với chúng tôi. Sau khi xóa, dữ liệu sẽ được giữ lại theo chính sách bảo mật.",
              },
              {
                title: "8. Liên Kết Bên Ngoài",
                content:
                  "Gami có thể chứa các liên kết đến các trang web bên ngoài. Chúng tôi không chịu trách nhiệm về nội dung, chính sách hoặc thực hành của các trang web này. Vui lòng đọc các điều khoản của chúng trước khi sử dụng.",
              },
              {
                title: "9. Luật Áp Dụng",
                content:
                  "Các điều khoản này được điều chỉnh bởi luật pháp của Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam. Bất kỳ tranh chấp nào sẽ được giải quyết trong tòa án có thẩm quyền tại Thành phố Hồ Chí Minh.",
              },
              {
                title: "10. Liên Hệ",
                content:
                  "Nếu bạn có bất kỳ câu hỏi về các điều khoản này, vui lòng liên hệ với chúng tôi tại support@gami.vn hoặc gọi +84 (123) 456-789. Chúng tôi sẵn sàng giúp bạn 24/7.",
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-linear-to-br from-slate-900/50 to-blue-900/50 p-6 rounded-lg border border-cyan-500/30">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">{section.title}</h3>
                <p className="text-gray-300 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Agreement Section */}
          <div className="bg-linear-to-r from-cyan-600/10 to-blue-600/10 p-8 rounded-lg border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Đồng Ý Với Điều Khoản</h2>
            <p className="text-gray-300 mb-6">
              Bằng cách tiếp tục sử dụng Gami, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý tuân theo tất cả các điều khoản được nêu ở trên.
            </p>
            <button className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
              ✓ Tôi Đồng Ý
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}