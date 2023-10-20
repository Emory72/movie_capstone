import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { deleteMovie } from "../../../apis/movieAPI";
import { editMovie, getMovie } from "../../../apis/movieAPI";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function MovieList() {
  // State quản lý danh sách người dùng từ API
  const [movies, setMovies] = useState([]);
  //state quản lý người dùng đang được chọn

  const queryClient = useQueryClient();

  const {
    data: listMovie = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getMovie,
    refetchOnWindowFocus: false,
  });
  //MUI table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //MUI search
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  //Delete movie post
  const { mutate: handleDelete } = useMutation({
    mutationFn: (movieID) => deleteMovie(movieID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: handleEdit } = useMutation({
    mutationFn: (movieID) => editMovie(movieID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const [search, setSearch] = useState("");
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setProductData(search);
    }, 300);
    return () => clearTimeout(timeOut);
  }, [search]);

  console.log(listMovie);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="px-5">
      <h1 className="text-white mt-5 py-5">Danh Sách Phim </h1>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleSearch}
          value={search}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 5 }}>
        <TableContainer sx={{ maxHeight: 2000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ typography: "subtitle2" }}>
                <TableCell>Mã Phim </TableCell>
                <TableCell>Tên Phim</TableCell>
                <TableCell>Hình Ảnh </TableCell>
                <TableCell>Mô Tả</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listMovie
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.tenPhim.toLowerCase().includes(search);
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((movie) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={movie.maPhim}
                  >
                    <TableCell>{movie.maPhim}</TableCell>
                    <TableCell>{movie.tenPhim}</TableCell>
                    <TableCell>
                      <div>
                        <img
                          className="rounded"
                          width={150}
                          height={150}
                          src={movie.hinhAnh}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{movie.moTa}</TableCell>
                    <TableCell></TableCell>

                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        border: "none",
                      }}
                    >
                      <IconButton
                        onClick={() => handleEdit(movie.maPhim)}
                        size="large"
                      >
                        <EditIcon sx={{ marginRight: "5px" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(movie.maPhim)}
                        aria-label="delete"
                        size="large"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
