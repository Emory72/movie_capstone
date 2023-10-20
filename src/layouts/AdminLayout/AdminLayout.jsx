import React from "react";
import { useNavigate, Route, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import VideoSettingsRoundedIcon from "@mui/icons-material/VideoSettingsRounded";

const drawerWidth = 240;

export default function AdminLayout() {
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  // const { handleSignout } = useUserContext();
  const [openUser, setOpenUser] = React.useState(true);
  const [openMovie, setOpenMovie] = React.useState(true);

  const handleClickUser = () => {
    setOpenUser(!openUser);
  };
  const handleClickMovie = () => {
    setOpenMovie(!openMovie);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h4" noWrap component="div">
            HD Movie
          </Typography>

          <Box
            sx={{
              display: "flex",
              "&:hover": { color: "#FB4126" },
            }}
          >
            <Tooltip>
              <IconButton
                onClick={handleSignout}
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                sx={{ p: 3 }}
              >
                <AccountCircle sx={{ fontSize: "50px" }} />
              </IconButton>
              <Typography variant="h6" noWrap>
                Đăng Xuất
              </Typography>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List sx={{ paddingTop: 10 }}>
            <ListItemButton onClick={handleClickUser}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="User" />
              {openUser ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton href="/admin/users" sx={{ pl: 4 }}>
                  <ListItemText primary="Danh Sách User" />
                </ListItemButton>
                <ListItemButton href="/admin/addUser" sx={{ pl: 4 }}>
                  <ListItemText primary="Thêm User" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClickMovie}>
              <ListItemIcon>
                <VideoSettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Movie" />
              {openMovie ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMovie} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton href="/admin/movies" sx={{ pl: 4 }}>
                  <ListItemText primary="Danh Sách Phim" />
                </ListItemButton>
                <ListItemButton href="/admin/addMovie" sx={{ pl: 4 }}>
                  <ListItemText primary="Thêm Phim" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
