// setup Axios
import axios from "axios";

//setup axios instance
const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjIxLzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwODQ3MzYwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA4NjIxMjAwfQ.2JFd_iMYjvwU4SaKsLmL_x-kEZcKonddkHVR7z3Gxbc",
  },
});
//Request interceptor ( Gửi request đi )
fetcher.interceptors.request.use((request) => {
  //Kiem tra xem user login chưa để thêm token của user vào headers
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    request.headers.Authorization = `Bearer ${user.accessToken}`;
  }

  return request;
});

//response interceptor ( Trả response về), ý nghĩa buóc này cho phép transform data trả về
fetcher.interceptors.response.use(
  (response) => {
    // Có thể thay đổi response trước khi trả về
    // return response.data.content; thì bên các file movieAPI chỉ cần ghi return response , k cần chấm tới content
    return response;
  },
  (error) => {
    //Nếu là lỗi 401 => token không hợp lệ (hết hạn )=> Đăng xuất
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      //Do nằm ngoài tầm hoạt động của react-router-dom nên dùng window để chuyển hướng page về sign-in
      window.location.replace("/sign-in");
    }

    return Promise.reject(error);
  }
);

export default fetcher;
