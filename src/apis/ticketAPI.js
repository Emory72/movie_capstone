import fetcher from "./fetcher";

export async function getSeatlist(showtimeID) {
  try {
    const response = await fetcher.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: showtimeID,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
