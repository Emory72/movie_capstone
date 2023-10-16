import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/Home";
import Details from "./modules/Details";
import Ticket from "./modules/Ticket";
import NotFound from "./components/NotFound/NotFound";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Signin from "./modules/Auth/pages/Signin";
import Signup from "./modules/Auth/pages/Signup";
import UserProvider from "./contexts/UserContext/UserContext";
import ProtectedRoute from "./routers/ProtectedRoute/ProtectedRoute";
import AdminMovie from "./modules/AdminMovie/AdminMovie";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminProtectedRoute from "./routers/AdminProtectedRoute/AdminProtectedRoute";
import UserList from "./modules/AdminUser/UserList/UserList";
import AddUser from "./modules/AdminUser/AddUser/AddUser";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="movie/:movieID" element={<Details />} />
            <Route
              path="ticket/:showtimeID"
              element={
                <ProtectedRoute>
                  <Ticket />
                </ProtectedRoute>
              }
            />
            {/* Public routes */}
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>

          {/* Admin Routes need protected */}
          {/* <Route path="/" element={<AdminProtectedRoute />}> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="movies" element={<AdminMovie />}></Route>
            <Route path="users" element={<UserList />}></Route>
            <Route path="addUser" element={<AddUser />}></Route>
          </Route>
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
