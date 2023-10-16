import React, { useState, useEffect } from "react";
import fetcher from "../../../apis/fetcher";

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

export default function UserList() {
  // State quản lý danh sách người dùng từ API
  const [users, setUsers] = useState([]);
  //state quản lý người dùng đang được chọn
  const [selectedUser, setSelectedUser] = useState(null);
  const getUsers = async () => {
    try {
      const response = await fetcher.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung"
      );
      setUsers(response.data?.content);
    } catch (error) {
      throw error.response.data?.content;
    }
  };

  //Hàm nhận vào userID và tìm user tương ứng
  const onSelectUser = async (userID) => {
    try {
      const response = await fetcher.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDung/${userID}`
      );
      setSelectedUser(response.data?.content);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  //Delete user

  const handleDelete = async (userID) => {
    try {
      await fetcher.delete(`QuanLyNguoiDung/XoaNguoiDung/${userID}`);
      //Xoá thành công
      getUsers();
    } catch (error) {
      console.log(error.response.data);
    }
  };
  //Callback của useEffect sẽ tự động được gọi sau khi component render lần đầu, ta dùng để gọi hàm getUsers
  useEffect(() => {
    getUsers();
  }, []);

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

  return (
    <div className="px-5">
      <h1 className="text-white mt-5 py-5">Danh Sách User</h1>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
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
              {users
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
                      <button
                        className="btn btn-success me-3"
                        onClick={() => onSelectUser(user.index)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger">Delete</button>
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
    </div>
  );
}
