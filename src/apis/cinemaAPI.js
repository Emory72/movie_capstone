import fetcher from "./fetcher";

export async function getMovieShowtimes(movieID) {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: movieID,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
//第一个API
export async function getMovieSystem() {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinHeThongRap", {});
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovieAddress(systemID) {
  try {
    const response = await fetcher.get(
      "/QuanLyRap/LayThongTinCumRapTheoHeThong",
      {
        params: {
          maHeThongRap: systemID,
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovieDetails() {
  try {
    const response = await fetcher.get(
      "/QuanLyRap/LayThongTinLichChieuHeThongRap",
      {
        params: {
          maNhom: "GP13",
        },
      }
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
