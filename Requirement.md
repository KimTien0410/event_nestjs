# Event Management System with NestJS and TypeORM
1. Mục tiêu chính 
* Quản lý Event (CRUD)
* Quản lý User (CRUD)
* Quản lý Atendance (User đăng ký/ huỷ đăng ký tham gia event)
* Thống kê Top 100 user theo attendance
* Xuất/Generate ICS link để import event vào Google Calendar, Outlook, Apple calendar.
2. Thiết kế Database - POSTGRESQL
* Bảng User
    - id: number (Primary Key)
    - name: string
    - email: string (Unique)
    - role: string (Enum: 'admin', 'user')
    - password: string
    - created_at: Date
    - updated_at: Date
* Bảng Event
    - id: number (Primary Key)
    - title: string
    - date: Date
    - time_start: time
    - time_end: time
    - venue: string : (if offline or hybrid)
    - location: string (Địa chỉ hoặc link online)
    - status: string (Enum: 'upcoming', 'ongoing', 'completed', 'cancelled')
    - type: string (Enum: 'online', 'offline', 'hybrid')
    - capacity: number
    - createdAt: Date
    - updatedAt: Date
    - createdBy: number (Foreign Key to User)
* Bảng Attendance
    - id: number (Primary Key)
    - userId: number (Foreign Key to User)
    - eventId: number (Foreign Key to Event)
    - status: string (Enum: 'registered', 'cancelled')
    - registered_at: Date
3. Các API Endpoint
* User Management
    - POST /users: Tạo mới user
    - GET /users: Lấy danh sách tất cả user
    - GET /users/:id: Lấy thông tin chi tiết user theo id
    - PUT /users/:id: Cập nhật thông tin user theo id
    - DELETE /users/:id: Xoá user theo id
* Event Management
    - POST /events: Tạo mới event
    - GET /events: Lấy danh sách tất cả event
    - GET /events/:id: Lấy thông tin chi tiết event theo id
    - PUT /events/:id: Cập nhật thông tin event theo id
    - DELETE /events/:id: Xoá event theo id
* Attendance Management
    - POST /events/:eventId/register: User đăng ký tham gia event
    - POST /events/:eventId/cancel: User huỷ đăng ký tham gia event
    - GET /events/:eventId/attendees: Lấy danh sách user đã đăng ký tham gia event
* Statistics
    - GET /statistics/top-users: Lấy danh sách top 100 user theo số lần đăng ký tham gia event
* ICS Generation
    - GET /events/:id/ics: Xuất ICS link cho event theo id
4. Công nghệ sử dụng
* Backend: NestJS, TypeORM
* Database: PostgreSQL
5. Use Case chính
* Admin/ User CRUD
  - Thêm, sửa, xoá, xem danh sách event
  - Quản lý user (CRUD)
* Đăng ký/ Huỷ đăng ký event
  - User có thể đăng ký tham gia event
  - Nếu đã đăng ký thì cho phép "huỷ đăng ký"
* Thống kê top 100 user theo attendance
  - Dựa trên số lần status = 'registered' trong bảng Attendance
  - SQL query: 
    ```sql
    SELECT u.id, u.name, COUNT(a.id) AS attendance_count
    FROM users u
    JOIN attendance a ON u.id = a.userId
    WHERE a.status = 'registered'
    GROUP BY u.id
    ORDER BY attendance_count DESC
    LIMIT 100;
    ```
* Tạo ICS link
  - Khi user đăng ký, hệ thống generate file .íc với format chuẩn RFC 5545
  - Ví dụ nội dung file .ics:
    ```
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//Your Company//Your Product//EN
    BEGIN:VEVENT
    UID:123@gmail.com
    DTSTAMP:20231010T120000Z
    DTSTART:20231015T090000Z
    DTEND:20231015T110000Z
    SUMMARY:Sample Event
    DESCRIPTION:This is a sample event description.
    LOCATION:123 Event St, City, Country
    END:VEVENT
    END:VCALENDAR
    ```
    - Cho phép download file .ics hoặc cung cấp link để import trực tiếp
    - User có thể import file .ics vào Google Calendar, Outlook, Apple Calendar
6. Flow cơ bản
* Admin tạo event
* User đăng nhập -> Chọn event -> Đăng ký 
* Khi đăng ký thành công, hệ thống tạo bản ghi trong bảng Attendance với status = 'registered' và cung cấp link/file .ics
* User có thể huỷ đăng ký, hệ thống cập nhật status = 'cancelled'
* Admin có thể xem thống kê top 100 user theo attendance
7. Mở rộng
* Thông báo email khi user đăng ký/ huỷ đăng ký event -> nâng trải nghiệm
* Phân quyền chi tiết hơn (chỉ admin mới được tạo/sửa/xoá event) -> Bảo mật cơ bản
* Tìm kiếm, lọc event theo ngày, địa điểm -> bắt buộc nếu nhiều event
* Pagination cho danh sách user, event -> tối ưu performance
* Xác thực & bảo mật (JWT, OAuth) -> core bắt buộc
* Upload avatar cho user -> UX cơ bản
* Reset password qua email -> tính năng cơ bản cho hệ thống có user
* Comment / review cho event -> nâng trải nghiệm
* Đánh giá event (rating) -> nâng trải nghiệm
* Export danh sách user tham gia event (CSV, Excel) -> quản lý sự kiện -> Hữu ích cho admin 
* Thống kê chi tiết theo event(số lượng user đăng ký, huỷ đăng ký theo thời gian) -> nâng cao phân tích
* Yêu cầu xác nhạn tham gia event(RSVP) -> Mở rộng attendance logic.
* Recurring events (sự kiện định kỳ) -> phụ hợp nhiều use case
* Check-in tại sự kiện qua QR code -> tính năng thực tế, quản lý attendance
* Quản lý địa điểm tổ chức event (venues) -> mở rộng từ venue/location
* Theo dõi (folow) event và nhận thông báo khi có thay đổi -> UX tốt hơn
* Lịch sử đăng ký tham gia event -> hữu ích cho user & thống kê
* Backup & phục hồi dữ liệu -> quan trọng cho hệ thống thực tế