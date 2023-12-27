# ITSS-back-end

## Hướng dẫn set up và chạy server:

### Chuẩn bị:

Cài sẵn mysql, tạo 1 database mới tên là itss.
Cài nodejs.
Clone code về.

### Thiết lập kết nối database cho backend:

Vào file SetUpMySQL.js trong thư mục services, Có đoạn code:
const db = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "root",
database: "itss",
});
user, password của database mà bạn tạo.

Xây dựng cấu trúc bảng bằng cách chạy hết các câu lệnh trong file ITSS.sql.
Sau khi chạy xong, cấu trúc bảng được tạo ra, một số dữ liệu mẫu cũng được thêm vào.
1 account admin được thêm vào cơ sở dữ liệu:
email: admin@gmail.com
pass: 12345678

### Chạy backend:

Chạy bằng lệnh npm start.

### B2: Chạy command `node -v` để kiểm tra phiên bản của nodejs

- Nếu máy đã có nodejs rồi thì qua bước 3 <br />
- Nếu máy chưa có nodejs thì tải phiên bản mới nhất ở `https://nodejs.org/en`, rồi qua bước bước 3 <br />
- Nếu gặp vấn đề với node thì cài đặt NVM (https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
  - Sau đó cài đặt phiên bản node 16.15.1 với command `nvm install 16.15.1`

### B3: Chạy server với command `npm start` (nếu lỗi, chạy npm i trước để tải node-modules).

<br>
<br>
<br>
