# eLearningSystem

## Giới thiệu

`eLearningSystem` là hệ thống quản lý học tập trực tuyến được thiết kế để tối ưu hóa tương tác giữa giảng viên và sinh viên. Dự án tập trung vào việc hiện thực hóa các nghiệp vụ phức tạp thông qua:

- Stored Procedures
- Triggers
- Functions

Đây là một monorepo với backend, frontend và logic cơ sở dữ liệu riêng biệt.

## Tech Stack

| Công nghệ | Vai trò |
| --- | --- |
| React 19 | Xây dựng giao diện người dùng |
| TypeScript | Giữ an toàn kiểu dữ liệu |
| Vite | Công cụ build và môi trường phát triển |
| Tailwind CSS v4 | Tùy chọn UI framework |
| React Router DOM v7 | Điều hướng phía client |
| Axios | HTTP client |
| Husky + lint-staged | Git hooks kiểm tra mã trước commit |
| ESLint + Prettier | Kiểm tra và định dạng mã nguồn |

##  Cấu trúc dự án

```
/ backend/
/ frontend/
/ sql/
/ docs/
```

### Mô tả thư mục

- `backend/` - API server (NestJS/Express) và logic xử lý dữ liệu
- `frontend/` - Ứng dụng React + Vite
- `sql/` - Các script SQL
  - `01_schema/` - Định nghĩa bảng và ràng buộc DDL
  - `02_data/` - Dữ liệu mẫu (seed data)
  - `03_logic/` - Trigger, Procedure và Function
- `.husky/` - Git hooks kiểm tra commit message và branch name
- `docs/` - Tài liệu thiết kế ERD, mapping và mô tả yêu cầu

##  Hướng dẫn cài đặt

### 1. Cài đặt dependencies

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2. Thiết lập cơ sở dữ liệu

Thực thi các script SQL theo thứ tự sau:

1. `sql/01_schema/` – Tạo bảng và ràng buộc.
2. `sql/03_logic/` – Cài đặt Trigger, Procedure và Function.
3. `sql/02_data/01_seed.sql` – Nạp dữ liệu mẫu.

> Lưu ý: hãy đảm bảo thực thi đúng thứ tự để đảm bảo tính toàn vẹn dữ liệu.

##  Pre-commit Rules

### Branch naming

Các nhánh phải tuân thủ định dạng:

- `feature/<ten_thanh_vien>`
- `fix/<ten_thanh_vien>`

### Commit message

Sử dụng Conventional Commits:

- `feat:` Thêm tính năng mới
- `fix:` Sửa lỗi
- `docs:` Cập nhật tài liệu

##  Yêu cầu bài tập lớn

Dự án đáp ứng các tiêu chí sau:

- `SQL Schema` - Thiết kế bảng với khóa chính, khóa ngoại và ràng buộc dữ liệu.
- `Stored Procedures` - CRUD có validate dữ liệu và thông báo lỗi rõ ràng.
- `Triggers` - Kiểm tra business rules và tự động tính toán giá trị dẫn xuất.
- `Functions` - Hàm tính toán phức tạp sử dụng cursor và vòng lặp.
- `Integration` - Kết nối frontend với cơ sở dữ liệu, hiển thị danh sách và tìm kiếm qua stored procedure.

