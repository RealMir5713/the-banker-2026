# Hướng dẫn Supabase cho form Webinar

Form tại `/webinar` lưu thông tin vào bảng `webinar_registrations` và lưu ảnh
minh chứng trong bucket riêng tư `webinar-proofs`.

## 1. Tạo và cấu hình Supabase

1. Đăng nhập [Supabase](https://supabase.com/dashboard) và tạo một project.
2. Mở **SQL Editor**.
3. Chọn **New query**.
4. Mở file `supabase/schema.sql` trong repository, dán toàn bộ nội dung vào
   SQL Editor và chọn **Run**.
5. Kiểm tra:
   - **Table Editor** có bảng `webinar_registrations`.
   - **Storage** có bucket `webinar-proofs`.
   - Bucket `webinar-proofs` hiển thị trạng thái **Private**.

Bạn có thể chạy lại `schema.sql` khi cập nhật website. Các câu lệnh trong file
được viết để giữ dữ liệu cũ và bổ sung các cột còn thiếu.

## 2. Lấy khóa kết nối

Trong Supabase, mở **Project Settings > API** và lấy:

- **Project URL**
- **anon public key**
- **service_role key**

Không chia sẻ `service_role key`, không đưa khóa này vào code phía trình duyệt
và không commit khóa vào GitHub.

## 3. Thêm biến môi trường trên Vercel

Trong Vercel, mở project **the-banker-2026**:

1. Chọn **Settings > Environment Variables**.
2. Thêm các biến sau cho môi trường Production:

```text
NEXT_PUBLIC_SUPABASE_URL=<Project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>
ADMIN_DASHBOARD_TOKEN=<mật khẩu quản trị tự đặt>
```

3. Chọn **Deployments**, mở menu của deployment mới nhất và chọn
   **Redeploy**.

`SUPABASE_SERVICE_ROLE_KEY` là bắt buộc đối với form webinar vì ảnh được tải
lên bucket riêng tư từ API server.

## 4. Kiểm tra form

1. Mở `https://the-banker-2026.vercel.app/webinar`.
2. Điền một bản đăng ký thử bằng email dễ nhận biết.
3. Tải ít nhất một ảnh cho mỗi mục minh chứng.
4. Chọn **Đăng ký tham dự** và chờ thông báo thành công.
5. Xóa bản thử sau khi kiểm tra xong.

Giới hạn hiện tại:

- Tối đa 5 ảnh cho mỗi mục minh chứng.
- Tối đa 5 MB cho mỗi ảnh.
- Chỉ nhận tệp có định dạng ảnh.

## 5. Xem và xuất danh sách đăng ký

1. Mở Supabase **Table Editor**.
2. Chọn bảng `webinar_registrations`.
3. Mỗi hàng là một người đăng ký.
4. Dùng bộ lọc của Table Editor để tìm theo email, số điện thoại hoặc trường.
5. Chọn **Export data > CSV** để tải danh sách cho Ban tổ chức.

Hai cột `proof_post_files` và `proof_fanpage_files` chứa danh sách JSON. Mỗi
ảnh có:

- `path`: đường dẫn trong Storage.
- `name`: tên file gốc của người đăng ký.
- `size`: kích thước file tính bằng byte.
- `type`: định dạng MIME của ảnh.

## 6. Xem hoặc tải ảnh minh chứng

1. Sao chép giá trị `path` của ảnh trong Table Editor.
2. Mở Supabase **Storage > webinar-proofs**.
3. Mở thư mục có UUID trùng với phần đầu của `path`.
4. Chọn thư mục `post` hoặc `fanpage`.
5. Chọn file và dùng nút **Download**.

Bucket là private nên ảnh không có đường dẫn công khai. Chỉ thành viên project
Supabase hoặc API sử dụng service-role mới đọc được.

## 7. Sao lưu và quyền truy cập

- Chỉ mời thành viên BTC cần thiết vào project Supabase.
- Không gửi service-role key qua tin nhắn hoặc email.
- Đổi key ngay nếu nghi ngờ bị lộ.
- Xuất CSV định kỳ trong thời gian mở đơn.
- Sau chương trình, tải bản sao dữ liệu và đặt lịch xóa ảnh theo chính sách
  bảo vệ dữ liệu của Ban tổ chức.
