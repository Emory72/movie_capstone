import fetcher from "./fetcher";

export const userRoles = async () => {
  try {
    const response = await fetcher.get(
      "/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
