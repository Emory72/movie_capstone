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

export async function getMovieSystem(systemID) {
  try {
    const response = await fetcher.get("/api/QuanLyRap/LayThongTinHeThongRap", {
      params: {
        maHeThongRap: systemID,
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
