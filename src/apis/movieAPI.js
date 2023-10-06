import fetcher from "./fetcher";

export async function getBanner() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovie() {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP13",
      },
    });
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getMovieDetails(movieID) {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: movieID,
      },
    });

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function addMovie(movie) {
  try {
    const response = await fetcher.post("/QuanLyPhim/LayThongTinPhim", movie);

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
