export interface McqOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface TfSubItem {
  subId: 'a' | 'b' | 'c' | 'd';
  text: string;
  answer: 'Đ' | 'S';
}

export interface Question {
  id: number;
  type: 'mcq' | 'tf';
  score: number;
  isStar?: boolean;
  title: string;
  options?: McqOption[];
  answer?: 'A' | 'B' | 'C' | 'D';
  items?: TfSubItem[];
  explain: string;
  obstacleName: string;
  obstacleIcon: string;
  hint: string;
}

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    type: 'mcq',
    score: 0.25,
    title: "Theo định nghĩa trong bài học, 'từ khoá' trong tìm kiếm thông tin là gì?",
    options: [
      { key: 'A', text: 'Tên đăng nhập và mật khẩu bí mật của máy tính' },
      { key: 'B', text: 'Từ hoặc cụm từ thể hiện nội dung thông tin chúng ta muốn tìm kiếm' },
      { key: 'C', text: 'Địa chỉ đường dẫn của một trang web bất kì' },
      { key: 'D', text: 'Một câu văn dài miêu tả đầy đủ bài tập' }
    ],
    answer: 'B',
    explain: "Ghi nhớ sách giáo khoa trang 19: 'Từ khoá là từ hoặc cụm từ thể hiện nội dung muốn tìm kiếm'.",
    obstacleName: "Cổng Đá Định Nghĩa",
    obstacleIcon: "🗿",
    hint: "Từ khoá là nội dung chính em gõ vào để máy tìm kiếm biết em đang muốn tìm gì."
  },
  {
    id: 2,
    type: 'mcq',
    score: 0.25,
    title: "Trong phần Khởi động, bạn Khoa và bạn Minh cần tìm kiếm thông tin về chủ đề gì để làm bài tập nhóm?",
    options: [
      { key: 'A', text: 'Các di tích lịch sử ở Hà Nội' },
      { key: 'B', text: 'Các đời vua Hùng cho môn Lịch sử và Địa lí' },
      { key: 'C', text: 'Tìm hiểu danh lam thắng cảnh ở địa phương' },
      { key: 'D', text: 'Nguồn gốc của ngày Tết Trung thu' }
    ],
    answer: 'B',
    explain: "Khởi động trang 18: 'Chúng ta có thể tìm kiếm thông tin về các đời vua Hùng để hoàn thành bài tập nhóm môn Lịch sử và Địa lí'.",
    obstacleName: "Cổ Thụ Sử Ký",
    obstacleIcon: "🌳",
    hint: "Bài tập nhóm liên quan đến các đời vua thời dựng nước trong môn Lịch sử và Địa lí."
  },
  {
    id: 3,
    type: 'mcq',
    score: 0.25,
    title: "Trước khi gõ nội dung vào ô tìm kiếm, bước QUAN TRỌNG ĐẦU TIÊN mà người dùng bắt buộc phải làm là gì?",
    options: [
      { key: 'A', text: 'Nhấn phím Enter nhiều lần' },
      { key: 'B', text: 'Xác định đúng chủ đề và từ khoá cần tìm kiếm' },
      { key: 'C', text: 'Tắt màn hình máy tính rồi bật lại' },
      { key: 'D', text: 'Nháy chuột vào một siêu liên kết ngẫu nhiên' }
    ],
    answer: 'B',
    explain: "Quy trình tìm kiếm trang 19: Bước 1 là 'Xác định từ khoá cần tìm kiếm'.",
    obstacleName: "Bệ Đá Khởi Đầu",
    obstacleIcon: "🧭",
    hint: "Muốn tìm nhanh và đúng, trước hết ta phải biết mình đang tìm từ khoá nào."
  },
  {
    id: 4,
    type: 'mcq',
    score: 0.25,
    title: "Tại sao việc xác định từ khoá chính xác lại mang tính quyết định đến kết quả tìm kiếm?",
    options: [
      { key: 'A', text: 'Vì từ khoá càng chuẩn xác thì máy tìm kiếm càng trả về đúng thông tin cần thiết và nhanh chóng' },
      { key: 'B', text: 'Vì nếu từ khoá sai thì máy tính sẽ bị tắt nguồn ngay lập tức' },
      { key: 'C', text: 'Vì máy tìm kiếm chỉ cho phép gõ từ khoá có 2 chữ' },
      { key: 'D', text: 'Vì từ khoá quyết định tốc độ mạng Internet nhanh hay chậm' }
    ],
    answer: 'A',
    explain: "Từ khoá thể hiện nội dung cần tìm; từ khoá phù hợp giúp máy tìm kiếm lọc chính xác các bài viết liên quan thay vì các kết quả lan man.",
    obstacleName: "Rương Bí Thuật Lọc Tin",
    obstacleIcon: "📦",
    hint: "Từ khoá chuẩn xác giúp bộ lọc của máy tìm kiếm thu hẹp phạm vi và đưa ra kết quả sát nhất."
  },
  {
    id: 5,
    type: 'mcq',
    score: 0.25,
    title: "Trong các website sau, đâu là nhóm gồm toàn bộ các 'máy tìm kiếm' phổ biến được nêu trong bài?",
    options: [
      { key: 'A', text: 'google.com, facebook.com, youtube.com' },
      { key: 'B', text: 'google.com, bing.com, ask.com' },
      { key: 'C', text: 'vtc.vn, laodong.vn, vietnamtourism.gov.vn' },
      { key: 'D', text: 'zalo.me, google.com, wikipedia.org' }
    ],
    answer: 'B',
    explain: "Sách giáo khoa trang 19 nêu: 'Có rất nhiều máy tìm kiếm, ví dụ: google.com, bing.com, ask.com,... là các máy tìm kiếm được sử dụng phổ biến'.",
    obstacleName: "Cổng Tam Đại Cổ Kính",
    obstacleIcon: "⛩️",
    hint: "Tìm nhóm gồm 3 cỗ máy tìm kiếm chuyên dụng trên thế giới được nhắc đến trong sách."
  },
  {
    id: 6,
    type: 'mcq',
    score: 0.25,
    title: "Để truy cập vào trang web tìm kiếm Google, bạn Khoa đã hướng dẫn bạn Minh nhập 'google.com' vào vị trí nào?",
    options: [
      { key: 'A', text: 'Thanh tiêu đề của hệ điều hành' },
      { key: 'B', text: 'Thanh địa chỉ của trình duyệt web' },
      { key: 'C', text: 'Màn hình nền máy tính' },
      { key: 'D', text: 'Thư mục chứa tệp văn bản' }
    ],
    answer: 'B',
    explain: "Sách trang 18 & 19: Gõ google.com vào 'thanh địa chỉ' của trình duyệt web.",
    obstacleName: "Cột Mốc Tọa Độ Web",
    obstacleIcon: "🌐",
    hint: "Để mở bất kì một trang web nào, ta nhập URL vào thanh nằm ở trên cùng của trình duyệt."
  },
  {
    id: 7,
    type: 'mcq',
    score: 0.25,
    title: "Khi gõ từ khoá vào ô tìm kiếm của Google, thao tác nào giúp gửi yêu cầu tìm kiếm đến hệ thống?",
    options: [
      { key: 'A', text: 'Nhấn phím Space (phím cách)' },
      { key: 'B', text: 'Nhấn phím Enter (hoặc nháy nút Tìm trên Google)' },
      { key: 'C', text: 'Nhấn phím Caps Lock' },
      { key: 'D', text: 'Nháy đúp chuột vào màn hình nền' }
    ],
    answer: 'B',
    explain: "Bước 3 trang 19: 'Gõ từ khoá tìm kiếm vào ô tìm kiếm rồi nhấn phím Enter'.",
    obstacleName: "Công Tắc Lôi Thần (Enter)",
    obstacleIcon: "⚡",
    hint: "Phím quen thuộc dùng để xác nhận lệnh và gửi nội dung trên bàn phím máy tính."
  },
  {
    id: 8,
    type: 'mcq',
    score: 0.25,
    title: "Sau khi nhấn phím Enter để tìm kiếm, màn hình trang web sẽ hiển thị kết quả là gì?",
    options: [
      { key: 'A', text: 'Toàn bộ bài viết chi tiết được mở ra ngay lập tức' },
      { key: 'B', text: 'Một danh sách chứa các siêu liên kết dẫn đến các trang web liên quan' },
      { key: 'C', text: 'Chỉ hiển thị một bức ảnh duy nhất' },
      { key: 'D', text: 'Một bảng trắng không có chữ' }
    ],
    answer: 'B',
    explain: "Bước 3 trang 19: '...trên trang web sẽ xuất hiện danh sách các siêu liên kết'.",
    obstacleName: "Mạng Lưới Siêu Liên Kết",
    obstacleIcon: "🔗",
    hint: "Kết quả tra cứu là một danh sách các đường dẫn xanh có thể nhấp vào để đọc bài."
  },
  {
    id: 9,
    type: 'mcq',
    score: 0.25,
    title: "Để xem nội dung thông tin chi tiết của một bài viết trong danh sách kết quả, em cần làm gì?",
    options: [
      { key: 'A', text: 'Gõ lại từ khoá một lần nữa' },
      { key: 'B', text: 'Nháy chuột vào siêu liên kết của kết quả đó' },
      { key: 'C', text: 'Đóng cửa sổ trình duyệt lại' },
      { key: 'D', text: 'Nhấn nút F5 trên bàn phím' }
    ],
    answer: 'B',
    explain: "Bước 4 trang 19: 'Nháy chuột vào một siêu liên kết trong danh sách để xem thông tin chi tiết'.",
    obstacleName: "Cửa Hầm Tri Thức",
    obstacleIcon: "🚪",
    hint: "Thao tác chuột cơ bản vào dòng tiêu đề màu xanh để mở trang web tương ứng."
  },
  {
    id: 10,
    type: 'mcq',
    score: 0.25,
    title: "Nếu muốn tìm hiểu thông tin cụ thể về 'Bảo tàng Dân tộc học Việt Nam', từ khoá nào dưới đây là PHÙ HỢP NHẤT?",
    options: [
      { key: 'A', text: 'Bảo tàng' },
      { key: 'B', text: 'Bảo tàng Dân tộc học Việt Nam' },
      { key: 'C', text: 'Bảo tàng Việt Nam' },
      { key: 'D', text: 'Các dân tộc ở Việt Nam' }
    ],
    answer: 'B',
    explain: "Câu hỏi 1 trang 19: 'Bảo tàng' quá rộng; 'Bảo tàng Việt Nam' chung chung; 'Bảo tàng Dân tộc học Việt Nam' là từ khoá chính xác và đầy đủ nhất.",
    obstacleName: "Linh Vật Bảo Tàng",
    obstacleIcon: "🏛️",
    hint: "Dùng chính tên đầy đủ và chuẩn xác của địa điểm cần tìm."
  },
  {
    id: 11,
    type: 'mcq',
    score: 0.25,
    title: "Vì sao từ khoá 'Bảo tàng' lại KHÔNG PHẢI là lựa chọn tốt khi muốn tìm Bảo tàng Dân tộc học Việt Nam?",
    options: [
      { key: 'A', text: 'Vì từ này viết không đúng chính tả' },
      { key: 'B', text: 'Vì từ này quá chung chung, kết quả sẽ ra hàng triệu bảo tàng khác trên thế giới và Việt Nam, rất khó tìm đúng cái mình cần' },
      { key: 'C', text: 'Vì máy tìm kiếm không hiểu được từ này' },
      { key: 'D', text: 'Vì từ này có ít hơn 10 chữ cái' }
    ],
    answer: 'B',
    explain: "Từ khoá quá ngắn và bao quát sẽ mang lại kết quả quá rộng, người dùng phải mất rất nhiều thời gian lọc tìm.",
    obstacleName: "Ảo Ảnh Mông Lung",
    obstacleIcon: "🌫️",
    hint: "Từ khoá quá rộng làm ngập tràn kết quả không liên quan."
  },
  {
    id: 12,
    type: 'mcq',
    score: 0.25,
    title: "Quan sát Hình 12 trong bài, khi em đang gõ chữ 'Hồ Gươm' vào ô tìm kiếm thì điều gì xuất hiện bên dưới?",
    options: [
      { key: 'A', text: 'Một thông báo lỗi bàn phím' },
      { key: 'B', text: 'Danh sách các \'từ gợi ý\' liên quan (như hồ gươm plaza, hồ gươm xanh, hồ gươm ở đâu...)' },
      { key: 'C', text: 'Máy tính tự động phát âm thanh cảnh báo' },
      { key: 'D', text: 'Màn hình tự động phóng to' }
    ],
    answer: 'B',
    explain: "Hình 12 trang 20: Khi nhập từ khoá, máy tìm kiếm sẽ tự động hiển thị danh sách 'các từ gợi ý' có liên quan để người dùng chọn nhanh.",
    obstacleName: "Hạc Thần Gợi Ý",
    obstacleIcon: "💡",
    hint: "Hộp danh sách tự động xổ xuống khi ta đang gõ các chữ cái đầu tiên."
  },
  {
    id: 13,
    type: 'mcq',
    score: 0.25,
    title: "Mục đích của tính năng 'từ gợi ý' xuất hiện khi em đang nhập từ khoá là gì?",
    options: [
      { key: 'A', text: 'Bắt buộc người dùng phải chọn theo máy tính' },
      { key: 'B', text: 'Giúp người dùng tiết kiệm thời gian gõ phím và gợi ý các chủ đề tìm kiếm phổ biến, chính xác' },
      { key: 'C', text: 'Để kiểm tra xem học sinh có nhớ từ khoá hay không' },
      { key: 'D', text: 'Để xóa từ khoá em vừa nhập vào' }
    ],
    answer: 'B',
    explain: "Từ gợi ý giúp người dùng không phải gõ hết cả cụm từ dài và mở rộng thêm các khía cạnh tìm kiếm liên quan hữu ích.",
    obstacleName: "Kim Đồng Hồ Tốc Độ",
    obstacleIcon: "⏱️",
    hint: "Tính năng này giúp chúng ta không phải gõ hết các chữ và tìm đúng chủ đề nhanh hơn."
  },
  {
    id: 14,
    type: 'mcq',
    score: 0.25,
    title: "Trong bài thực hành tìm kiếm thông tin về Hồ Gươm (Hình 14), kết quả được mở ra từ trang web của cơ quan nào?",
    options: [
      { key: 'A', text: 'Báo Thiếu niên Tiền phong' },
      { key: 'B', text: 'Trang web của Tổng cục Du lịch (vietnamtourism.gov.vn)' },
      { key: 'C', text: 'Một trang mạng xã hội cá nhân' },
      { key: 'D', text: 'Trang web mua bán sách trực tuyến' }
    ],
    answer: 'B',
    explain: "Chú thích Hình 14 trang 21: 'Thông tin chi tiết về Hồ Gươm trên trang web của Tổng cục du lịch'.",
    obstacleName: "Tháp Rùa Cổ Kính",
    obstacleIcon: "🐢",
    hint: "Trang web chính thức của ngành du lịch Việt Nam có đuôi tên miền .gov.vn."
  },
  {
    id: 15,
    type: 'mcq',
    score: 0.25,
    title: "Tại sao kết quả từ trang 'vietnamtourism.gov.vn' về Hồ Gươm lại được xem là nguồn thông tin đáng tin cậy?",
    options: [
      { key: 'A', text: 'Vì trang web này có nhiều hình ảnh đẹp nhất' },
      { key: 'B', text: 'Vì đây là website chính thức của Tổng cục Du lịch thuộc cơ quan nhà nước (.gov.vn)' },
      { key: 'C', text: 'Vì trang web này xuất hiện đầu tiên' },
      { key: 'D', text: 'Vì bài viết này rất ngắn gọn' }
    ],
    answer: 'B',
    explain: "Website có tên miền .gov.vn là của các cơ quan quản lý nhà nước tại Việt Nam, thông tin được kiểm duyệt chuẩn xác và có giá trị tham khảo cao.",
    obstacleName: "Ấn Tín Chính Thống",
    obstacleIcon: "📜",
    hint: "Đuôi .gov.vn đại diện cho cơ quan quản lý nhà nước (Government)."
  },
  {
    id: 16,
    type: 'mcq',
    score: 0.25,
    title: "Trong phần Luyện tập 1, chủ đề là 'vai trò của không khí đối với con người'. Bạn nào sau đây chọn từ khoá PHÙ HỢP NHẤT?",
    options: [
      { key: 'A', text: 'Khoa chọn: Không khí' },
      { key: 'B', text: 'An chọn: Không khí và con người' },
      { key: 'C', text: 'Minh chọn: Vai trò của không khí đối với con người' },
      { key: 'D', text: 'Hoa chọn: Con người cần không khí không?' }
    ],
    answer: 'C',
    explain: "Luyện tập 1 trang 21: Bạn Minh chọn 'Vai trò của không khí đối với con người' là sát và chuẩn xác nhất với đúng yêu cầu của chủ đề.",
    obstacleName: "Quả Cầu Khí Quyển",
    obstacleIcon: "💨",
    hint: "Từ khoá nêu rõ đúng trọng tâm cần tìm: 'vai trò' của không khí đối với đời sống con người."
  },
  {
    id: 17,
    type: 'mcq',
    score: 0.25,
    title: "Tại sao bạn Hoa chọn từ khoá 'Con người cần không khí không?' lại CHƯA PHẢI là lựa chọn tối ưu?",
    options: [
      { key: 'A', text: 'Vì từ khoá này bị sai chính tả' },
      { key: 'B', text: 'Vì đây là câu hỏi nghi vấn (Có/Không), không nêu bật được trực diện nội dung \'vai trò cụ thể\' cần tìm hiểu' },
      { key: 'C', text: 'Vì máy tìm kiếm không thể xử lí dấu chấm hỏi (?)' },
      { key: 'D', text: 'Vì từ khoá này quá ngắn' }
    ],
    answer: 'B',
    explain: "Từ khoá dạng câu hỏi Có/Không thường dẫn đến các bài viết tranh luận đơn giản, không cung cấp đầy đủ thông tin về vai trò, tác dụng như cụm từ khoá của Minh.",
    obstacleName: "Gương Bí Ẩn Nghi Vấn",
    obstacleIcon: "❓",
    hint: "Câu hỏi nghi vấn thường dẫn đến câu trả lời ngắn gọn Có/Không thay vì cung cấp kiến thức khoa học chi tiết."
  },
  {
    id: 18,
    type: 'mcq',
    score: 0.25,
    title: "Để tìm thông tin về di tích 'Văn Miếu - Quốc Tử Giám' trong bài Luyện tập 2, từ khoá nào sau đây nên được dùng?",
    options: [
      { key: 'A', text: 'Trường học xưa' },
      { key: 'B', text: 'Hà Nội' },
      { key: 'C', text: 'Văn Miếu - Quốc Tử Giám' },
      { key: 'D', text: 'Di tích lịch sử Việt Nam' }
    ],
    answer: 'C',
    explain: "Dùng chính tên riêng của di tích 'Văn Miếu - Quốc Tử Giám' làm từ khoá sẽ giúp tìm thấy các trang thông tin chính thống nhanh và đúng nhất.",
    obstacleName: "Khuê Văn Các Cổ Kính",
    obstacleIcon: "🏯",
    hint: "Sử dụng trực tiếp tên riêng đầy đủ của trường đại học đầu tiên của Việt Nam."
  },
  {
    id: 19,
    type: 'mcq',
    score: 0.25,
    title: "Khi nhập từ khoá 'Cac doi vua Hung' (không dấu), máy tìm kiếm Google có thể trả về kết quả đúng hay không?",
    options: [
      { key: 'A', text: 'Không thể trả về kết quả nào vì bắt buộc phải gõ đúng dấu tiếng Việt' },
      { key: 'B', text: 'Có, vì máy tìm kiếm thông minh có khả năng nhận diện và gợi ý từ tiếng Việt có dấu tương ứng' },
      { key: 'C', text: 'Máy tính sẽ bị khóa tài khoản' },
      { key: 'D', text: 'Chỉ tìm được các trang web bằng tiếng Anh' }
    ],
    answer: 'B',
    explain: "Hình 10 trang 19 minh họa bạn Khoa gõ 'Cac doi vua Hung' (không dấu) nhưng Google vẫn hiểu và trả về các kết quả '18 đời vua Hùng' bằng tiếng Việt có dấu.",
    obstacleName: "Bản Rập Không Dấu",
    obstacleIcon: "🔤",
    hint: "Thuật toán tìm kiếm hiện đại rất thông minh trong việc đoán từ tiếng Việt không dấu."
  },
  {
    id: 20,
    type: 'mcq',
    score: 0.25,
    title: "Nếu em muốn tìm kiếm danh lam thắng cảnh ở tỉnh/thành phố nơi em sống (Vận dụng 1), cách tạo từ khoá tốt nhất là:",
    options: [
      { key: 'A', text: 'Chỉ gõ từ: Cảnh đẹp' },
      { key: 'B', text: 'Gõ cụm từ: Danh lam thắng cảnh ở + Tên địa phương của em' },
      { key: 'C', text: 'Gõ tên của em vào ô tìm kiếm' },
      { key: 'D', text: 'Gõ cụm từ: Đi du lịch ở đâu vui nhất' }
    ],
    answer: 'B',
    explain: "Kết hợp nội dung cần tìm ('Danh lam thắng cảnh') với vị trí địa lí cụ thể ('ở Cần Thơ', 'ở Hà Nội'...) sẽ cho kết quả chính xác nhất.",
    obstacleName: "Bản Đồ Quê Hương",
    obstacleIcon: "🗺️",
    hint: "Kết hợp nội dung đề tài với tên tỉnh/thành phố cụ thể để khu trú kết quả."
  },
  {
    id: 21,
    type: 'mcq',
    score: 0.25,
    title: "Sự khác biệt cơ bản giữa 'thanh địa chỉ của trình duyệt' và 'ô tìm kiếm của Google' là gì?",
    options: [
      { key: 'A', text: 'Hai vị trí này hoàn toàn giống nhau và không có gì khác biệt' },
      { key: 'B', text: 'Thanh địa chỉ dùng để nhập trực tiếp địa chỉ website (URL), còn ô tìm kiếm dùng để nhập từ khoá nội dung cần tra cứu' },
      { key: 'C', text: 'Thanh địa chỉ chỉ gõ được số, ô tìm kiếm chỉ gõ được chữ' },
      { key: 'D', text: 'Ô tìm kiếm nằm ở ngoài màn hình máy tính' }
    ],
    answer: 'B',
    explain: "Thanh địa chỉ (Address Bar) để truy cập đến 1 trang web cụ thể như google.com; còn Search Box trên trang Google để nhập từ khoá tra cứu.",
    obstacleName: "Cổng Song Song (URL vs Search)",
    obstacleIcon: "⚖️",
    hint: "Một bên gõ đường link trang web, một bên gõ từ khoá nội dung tra cứu."
  },
  {
    id: 22,
    type: 'mcq',
    score: 0.25,
    title: "Bốn bước tìm kiếm thông tin trên Internet theo đúng trình tự bài học là:",
    options: [
      { key: 'A', text: 'Nháy chuột vào liên kết → Mở trình duyệt → Gõ từ khoá → Xác định từ khoá' },
      { key: 'B', text: 'Xác định từ khoá → Mở trình duyệt và gõ địa chỉ máy tìm kiếm → Gõ từ khoá và nhấn Enter → Nháy chuột vào siêu liên kết' },
      { key: 'C', text: 'Gõ google.com → Gõ từ khoá → Tắt máy tính → Đọc thông tin' },
      { key: 'D', text: 'Mở trình duyệt → Nháy chuột vào liên kết → Gõ từ khoá → Xác định chủ đề' }
    ],
    answer: 'B',
    explain: "Ghi nhớ trang 19 nêu đúng trình tự 4 bước: (1) Xác định từ khoá; (2) Mở trình duyệt và gõ địa chỉ máy tìm kiếm; (3) Gõ từ khoá và Enter; (4) Nháy vào siêu liên kết.",
    obstacleName: "Tứ Đại Quy Trình",
    obstacleIcon: "🪜",
    hint: "Bắt đầu bằng việc xác định từ khoá, tiếp theo là mở trình duyệt, gõ từ khoá rồi bấm vào liên kết."
  },
  {
    id: 23,
    type: 'mcq',
    score: 0.25,
    title: "Trong danh sách kết quả ở Hình 10, ngoài các bài viết tin tức thì máy tìm kiếm còn hiển thị loại nội dung nào dưới đây?",
    options: [
      { key: 'A', text: 'Mục Video (Lịch Sử Các Vua Hùng trên YouTube)' },
      { key: 'B', text: 'Trò chơi điện tử trực tuyến' },
      { key: 'C', text: 'Tệp tải về bị khóa' },
      { key: 'D', text: 'Bảng điểm học tập của học sinh' }
    ],
    answer: 'A',
    explain: "Hình 10 trang 19 hiển thị rõ mục Video với tiêu đề 'Lịch Sử Các Vua Hùng (FULL) - YouTube' bên dưới các bài viết tin tức.",
    obstacleName: "Gương Chiếu Đa Phương Tiện",
    obstacleIcon: "🎬",
    hint: "Hình 10 trong sách giáo khoa có khung video clip minh họa từ YouTube."
  },
  {
    id: 24,
    type: 'mcq',
    score: 0.25,
    title: "Khi kết quả tìm kiếm xuất hiện, một học sinh thông minh và cẩn thận sẽ chọn xem thông tin như thế nào?",
    options: [
      { key: 'A', text: 'Bấm bừa vào tất cả các liên kết có trên màn hình' },
      { key: 'B', text: 'Đọc tiêu đề và dòng tóm tắt bên dưới để chọn liên kết đáng tin cậy và sát với nội dung cần tìm nhất' },
      { key: 'C', text: 'Chỉ chọn trang web nào có nhiều quảng cáo đồ chơi' },
      { key: 'D', text: 'Không xem liên kết nào mà tắt máy ngay' }
    ],
    answer: 'B',
    explain: "Mỗi kết quả đều có tiêu đề và đoạn trích ngắn (snippet) giúp người dùng phán đoán nội dung hữu ích trước khi nhấp chuột.",
    obstacleName: "Kính Lúp Tinh Anh",
    obstacleIcon: "🔍",
    hint: "Đọc lướt tiêu đề và đoạn tóm tắt bên dưới trước khi nhấp chuột."
  },

  // 4 Câu Đúng / Sai đặc biệt (mỗi câu 4 ý a, b, c, d)
  {
    id: 25,
    type: 'tf',
    score: 1.0,
    isStar: true,
    title: "Em hãy chọn Đúng (Đ) hoặc Sai (S) cho các nhận định sau về khái niệm và cách xác định từ khoá:",
    items: [
      { subId: 'a', text: 'Từ khoá bắt buộc phải là một câu văn hoàn chỉnh có đầy đủ chủ ngữ và vị ngữ.', answer: 'S' },
      { subId: 'b', text: 'Từ khoá là từ hoặc cụm từ thể hiện nội dung thông tin chúng ta muốn tìm kiếm.', answer: 'Đ' },
      { subId: 'c', text: 'Chọn từ khoá quá ngắn và chung chung (ví dụ: \'Vua\') sẽ khó tìm đúng thông tin mong muốn.', answer: 'Đ' },
      { subId: 'd', text: 'Một chủ đề tìm kiếm chỉ có thể có duy nhất một từ khoá, không thể diễn đạt bằng cụm từ khác.', answer: 'S' }
    ],
    explain: "Đáp án: a - Sai (từ khoá thường là cụm từ ngắn gọn, súc tích) | b - Đúng | c - Đúng | d - Sai (có thể có nhiều từ khoá đồng nghĩa hoặc cụ thể hơn).",
    obstacleName: "Tứ Trụ Khái Niệm",
    obstacleIcon: "💎",
    hint: "Từ khoá là từ hoặc cụm từ, không cần câu hoàn chỉnh, và có thể có nhiều cách diễn đạt khác nhau."
  },
  {
    id: 26,
    type: 'tf',
    score: 1.0,
    isStar: true,
    title: "Em hãy chọn Đúng (Đ) hoặc Sai (S) cho các phát biểu về máy tìm kiếm trên Internet:",
    items: [
      { subId: 'a', text: 'Google.com là máy tìm kiếm duy nhất trên Internet, ngoài ra không còn máy tìm kiếm nào khác.', answer: 'S' },
      { subId: 'b', text: 'Bing.com và ask.com cũng là những máy tìm kiếm phổ biến trên thế giới.', answer: 'Đ' },
      { subId: 'c', text: 'Để sử dụng máy tìm kiếm, em cần mở trình duyệt web và nhập địa chỉ máy tìm kiếm vào thanh địa chỉ.', answer: 'Đ' },
      { subId: 'd', text: 'Máy tìm kiếm có thể trả về nhiều dạng kết quả khác nhau như văn bản, hình ảnh, video.', answer: 'Đ' }
    ],
    explain: "Đáp án: a - Sai (có nhiều máy tìm kiếm như Bing, Ask...) | b - Đúng (sách nêu trang 19) | c - Đúng | d - Đúng (kết quả gồm tin tức, video, bài viết).",
    obstacleName: "Tứ Trụ Máy Tìm Kiếm",
    obstacleIcon: "🔮",
    hint: "Ngoài Google còn có Bing, Ask,... và máy tìm kiếm trả về đa dạng hình ảnh, văn bản, video."
  },
  {
    id: 27,
    type: 'tf',
    score: 1.0,
    isStar: true,
    title: "Em hãy chọn Đúng (Đ) hoặc Sai (S) về các thao tác trong quá trình tìm kiếm thông tin:",
    items: [
      { subId: 'a', text: 'Khi gõ từ khoá vào ô tìm kiếm của Google, máy tìm kiếm có thể hiển thị danh sách các từ gợi ý.', answer: 'Đ' },
      { subId: 'b', text: 'Em có thể nháy chuột trực tiếp vào một từ gợi ý phù hợp để tìm kiếm mà không cần gõ hết cả câu.', answer: 'Đ' },
      { subId: 'c', text: 'Danh sách kết quả trả về luôn được mở ra trong các tệp Word tải về máy tính.', answer: 'S' },
      { subId: 'd', text: 'Nháy chuột vào một siêu liên kết trong danh sách kết quả sẽ dẫn em tới trang web chứa thông tin chi tiết.', answer: 'Đ' }
    ],
    explain: "Đáp án: a - Đúng | b - Đúng (Hình 12) | c - Sai (kết quả hiển thị dưới dạng danh sách siêu liên kết trên trang web) | d - Đúng.",
    obstacleName: "Tứ Trụ Thao Tác",
    obstacleIcon: "⚙️",
    hint: "Kết quả hiển thị trên trình duyệt dưới dạng siêu liên kết chứ không phải tự động tải file Word về."
  },
  {
    id: 28,
    type: 'tf',
    score: 1.0,
    isStar: true,
    title: "Em hãy chọn Đúng (Đ) hoặc Sai (S) cho việc đánh giá và lựa chọn từ khoá trong các tình huống thực tế:",
    items: [
      { subId: 'a', text: 'Với chủ đề \'tìm hiểu về Hồ Gươm\', từ khoá \'Hồ Gươm\' hoặc \'Hồ Hoàn Kiếm\' đều rất phù hợp.', answer: 'Đ' },
      { subId: 'b', text: 'Với chủ đề \'vai trò của không khí đối với con người\', từ khoá \'Không khí\' của bạn Khoa là từ khoá đầy đủ và tốt nhất.', answer: 'S' },
      { subId: 'c', text: 'Các thông tin nằm trên website của cơ quan chức năng (như Tổng cục Du lịch) có độ tin cậy cao.', answer: 'Đ' },
      { subId: 'd', text: 'Gõ từ khoá không dấu thì máy tìm kiếm Google hoàn toàn không thể đưa ra bất kì kết quả nào.', answer: 'S' }
    ],
    explain: "Đáp án: a - Đúng (Hồ Gươm còn gọi là Hồ Hoàn Kiếm) | b - Sai (từ của Khoa quá rộng, từ của Minh mới chuẩn nhất) | c - Đúng | d - Sai (Google vẫn tìm được từ khoá không dấu).",
    obstacleName: "Tứ Đại Phán Quyết Cuối Cùng",
    obstacleIcon: "👑",
    hint: "Hồ Gươm còn có tên Hồ Hoàn Kiếm; từ khoá của bạn Minh mới chuẩn; trang chính phủ đáng tin cậy."
  }
];

export interface LevelConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  difficultyLabel: string;
  badgeColor: string;
  gridWidth: number;
  gridHeight: number;
  questionIds: number[];
  theme: 'forest' | 'ruins' | 'cyber' | 'sanctuary' | 'grand';
}

export const LEVELS: LevelConfig[] = [
  {
    id: 'easy',
    name: 'Cấp độ 1: Dễ',
    title: 'Khu Rừng Khởi Nguyên',
    description: 'Bắt đầu hành trình! Mê cung lối đi rộng, gồm 7 chướng ngại vật đầu tiên (Câu 1 đến Câu 7).',
    difficultyLabel: 'Dễ (7 câu hỏi)',
    badgeColor: 'bg-emerald-600',
    gridWidth: 15,
    gridHeight: 15,
    questionIds: [1, 2, 3, 4, 5, 6, 7],
    theme: 'forest'
  },
  {
    id: 'medium',
    name: 'Cấp độ 2: Trung Bình',
    title: 'Cổ Trấn Siêu Liên Kết',
    description: 'Đường đi quanh co hơn! Khám phá bí ẩn kết quả tìm kiếm và từ gợi ý (Câu 8 đến Câu 14).',
    difficultyLabel: 'Trung bình (7 câu hỏi)',
    badgeColor: 'bg-amber-600',
    gridWidth: 19,
    gridHeight: 19,
    questionIds: [8, 9, 10, 11, 12, 13, 14],
    theme: 'ruins'
  },
  {
    id: 'hard',
    name: 'Cấp độ 3: Khó',
    title: 'Mê Cung Ma Trận Số',
    description: 'Độ khó tăng cao! Đánh giá độ tin cậy và kỹ năng tạo từ khoá chuẩn xác (Câu 15 đến Câu 21).',
    difficultyLabel: 'Khó (7 câu hỏi)',
    badgeColor: 'bg-rose-600',
    gridWidth: 23,
    gridHeight: 23,
    questionIds: [15, 16, 17, 18, 19, 20, 21],
    theme: 'cyber'
  },
  {
    id: 'expert',
    name: 'Cấp độ 4: Siêu Khó',
    title: 'Đền Thờ Tri Thức Tối Thượng',
    description: 'Thử thách đỉnh cao! Chứa 4 câu Đúng/Sai tổng hợp đặc biệt và quy trình tìm kiếm (Câu 22 đến Câu 28).',
    difficultyLabel: 'Siêu khó (7 câu hỏi)',
    badgeColor: 'bg-purple-600',
    gridWidth: 25,
    gridHeight: 25,
    questionIds: [22, 23, 24, 25, 26, 27, 28],
    theme: 'sanctuary'
  },
  {
    id: 'marathon',
    name: 'Đại Mê Cung (28 Câu)',
    title: 'Hành Trình Vô Cực',
    description: 'Chinh phục toàn bộ 28 chướng ngại vật trong một bản đồ mê cung khổng lồ duy nhất!',
    difficultyLabel: 'Toàn Diện (28 câu hỏi)',
    badgeColor: 'bg-indigo-600',
    gridWidth: 31,
    gridHeight: 31,
    questionIds: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28
    ],
    theme: 'grand'
  }
];
