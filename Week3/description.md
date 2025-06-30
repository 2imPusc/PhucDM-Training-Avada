# Todo App - Chạy FE & BE Local, Firestore Cloud

## Mô tả

Ứng dụng Todo sử dụng React (Frontend) và Koa (Backend) chạy trên máy local, dữ liệu được lưu trữ trên Firestore Cloud (Firebase).  
Bạn có thể phát triển, kiểm thử toàn bộ ứng dụng trên máy cá nhân mà không cần deploy backend lên cloud.

---

## 1. Yêu cầu

- Node.js >= 16
- Đã tạo project Firebase và bật Firestore trên [Firebase Console](https://console.firebase.google.com/)
- Đã cài đặt [Firebase CLI](https://firebase.google.com/docs/cli)

---

## 2. Cấu trúc thư mục

```
Week3/
  frontend/      # React app (FE)
  functions/     # Koa API (BE) chạy dưới dạng Firebase Functions
```

---

## 3. Cài đặt

### 3.1. Clone code và cài dependencies

```bash
git clone <repo-url>
cd Week3
cd frontend
npm install
cd ../functions
npm install
```

---

## 4. Cấu hình Firestore cho backend

- Đảm bảo đã đăng nhập Firebase CLI:
  ```bash
  firebase login
  ```
- Nếu chạy BE local, bạn có thể dùng service account (không bắt buộc nếu đã login):
  - Tải file serviceAccountKey từ Firebase Console (Project Settings > Service Accounts).
  - Trong `functions/src/database/firestore.js`:
    ```js
    const admin = require('firebase-admin');
    admin.initializeApp({
      // credential: admin.credential.cert(require('./serviceAccountKey.json')),
    });
    const db = admin.firestore();
    module.exports = db;
    ```

---

## 5. Chạy backend (Koa API) local

```bash
cd Week3/functions
npm run serve
```
- API sẽ chạy ở: `http://localhost:5001/<project-id>/us-central1/api/api/todos`

---

## 6. Chạy frontend (React) local

```bash
cd Week3/frontend
npm start
```
- FE sẽ chạy ở: `http://localhost:3000`

---

## 7. Kết nối FE với BE

- Trong FE, file `src/services/todoServices.js`, đảm bảo biến `API_URL` trỏ về BE local, ví dụ:
  ```js
  const API_URL = 'http://localhost:5001/<project-id>/us-central1/api/api/todos';
  ```

---

## 8. Sử dụng

- Truy cập `http://localhost:3000` để sử dụng ứng dụng.
- Thêm, sửa, xóa todo sẽ thao tác với Firestore Cloud qua backend local.

---

## 9. Lưu ý

- Nếu gặp lỗi CORS, đảm bảo backend đã bật CORS cho FE local.
- Khi muốn deploy thật, cần deploy cả FE và BE lên cloud.

---

## 10. Troubleshooting

- Nếu BE không nhận được body khi POST/PUT, kiểm tra middleware gán lại body từ Express sang Koa.
- Nếu không truy cập được Firestore, kiểm tra quyền truy cập hoặc cấu hình service account.

---

**Chúc bạn thành công!**