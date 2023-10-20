import React, { useState, useEffect } from "react";
import { getUser } from "../../../apis/userAPI";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { deleteUser } from "../../../apis/userAPI";
import { useForm } from "react-hook-form";
import { userInfoUpdate } from "../../../apis/userAPI";

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

//Modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function UserList() {
  // State quản lý danh sách người dùng từ API
  const [users, setUsers] = useState([]);
  //state quản lý người dùng đang được chọn

  const {
    data: listUser = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getUser,
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

  //set up Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenandUpdate = () => {
    handleOpen();
    handleUpdateUser();
  };
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung: "",
      maNhom: "GP13",
    },
    mode: "onTouched",
  });
  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: (values) => {
      return userInfoUpdate(values);
    },
    onSuccess: () => {
      reset();

      // Sử dụng queryClient.invalidateQuerries để gọi lại API get danh sách phim
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const onSubmit = (values) => {
    handleUpdateUser(values);
  };

  //Delete Movie post
  const { mutate: handleDelete } = useMutation({
    mutationFn: (userID) => deleteUser(userID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  //Search User

  const [search, setSearch] = useState("");
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setProductData(search);
    }, 300);
    return () => clearTimeout(timeOut);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="px-5">
      <h1 className="text-white mt-5 py-5">Danh Sách User</h1>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          sx={{ color: "black" }}
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
                <TableCell>STT</TableCell>
                <TableCell>Tài Khoản</TableCell>
                <TableCell>Họ và Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Mật Khẩu</TableCell>
                <TableCell>Loại Người Dùng</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listUser
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.hoTen.toLowerCase().includes(search);
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={user.taiKhoan}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.taiKhoan}</TableCell>
                    <TableCell>{user.hoTen}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.soDT}</TableCell>
                    <TableCell>{user.matKhau}</TableCell>
                    <TableCell>{user.maLoaiNguoiDung}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenandUpdate(user.taiKhoan)}
                      >
                        <EditIcon sx={{ marginRight: "5px" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(user.taiKhoan)}
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Cập Nhật Thông Tin Người Dùng
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="  px-5 py-5 border-3 bg-white text-dark"
          >
            <div className="mb-3">
              <label className="form-label fw-bold fw-bold">Tài Khoản</label>
              <input
                className="form-control "
                placeholder="Tên tài khoản"
                {...register("taiKhoan", {
                  required: {
                    value: true,
                    message: "Tài khoản không được để trống",
                  },
                })}
              />
              {errors.taiKhoan && (
                <p className="text-danger">{errors.taiKhoan.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold fw-bold">Họ và Tên</label>
              <input
                placeholder="Họ và tên "
                className="form-control "
                {...register("hoTen", {
                  required: {
                    value: true,
                    message: "Họ tên không được để trống",
                  },
                })}
              />

              {errors.hoTen && (
                <p className="text-danger">{errors.hoTen.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                placeholder="Email"
                autoComplete="current-password"
                className="form-control "
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email không được để trống",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Email không đúng định dạng",
                  },
                })}
              />

              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Số Điện Thoại</label>
              <input
                placeholder="Số điện thoại"
                className="form-control "
                type="number"
                {...register("soDt", {
                  required: {
                    value: true,
                    message: "Số điện thoại không được để trống",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Không đúng định dạng số",
                  },

                  maxLength: 11,
                })}
              />

              {errors.soDt && (
                <p className="text-danger">{errors.soDt.message}</p>
              )}
              {errors.soDt?.type === "maxLength" && (
                <p className="text-danger">nhiều nhất 11 kí tự</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Mật Khẩu</label>
              <input
                placeholder="Mật Khẩu"
                autoComplete="current-password"
                className="form-control "
                type="password"
                {...register("matKhau", {
                  required: {
                    value: true,
                    message: "Mật khẩu không được để trống",
                  },
                })}
              />

              {errors.matKhau && (
                <p className="text-danger">{errors.matKhau.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Mã loại người dùng</label>
              <select
                name="maLoaiNguoiDung"
                placeholder="Mã loại khách hàng"
                className="form-control "
                {...register("maLoaiNguoiDung")}
              >
                <option value="">Mã loại người dùng</option>
                <option value="KhachHang">Khách Hàng</option>
                <option value="QuanTri">Quản Trị</option>
              </select>
            </div>
            {errors.maLoaiNguoiDung && (
              <p className="text-danger">{errors.maLoaiNguoiDung.message}</p>
            )}
            <button type="submit" className="btn btn-primary fw-bold py-2 mt-2">
              Thêm User
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
