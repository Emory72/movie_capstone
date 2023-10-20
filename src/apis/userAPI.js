import fetcher from "./fetcher";

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
//Admin page user list
export async function getUser() {
  try {
    const response = await fetcher.get(
      "/QuanLyNguoiDung/LayDanhSachNguoiDung",
      {
        params: {
          maNhom: "GP13",
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

export const addUser = async (payload) => {
  try {
    const response = await fetcher.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const deleteUser = async (userID) => {
  try {
    const response = await fetcher.delete("/QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: userID,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//General Info page

export const userInfo = async () => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

//Update userInfo

export const userInfoUpdate = async () => {
  try {
    const response = await fetcher.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung"
    );
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
