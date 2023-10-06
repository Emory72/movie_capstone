import { useState, createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  //  Giá trị return trong callback của useState chính là giá trị ban đầu currentUser
  const [currentUser, setCurrentUser] = useState(() => {
    // Sau khi user sign in onSuccess thì data lưu lên storage và trả ra ở đây dùng để hiển thị lại cho các page khác
    const user = JSON.parse(localStorage.getItem("currentUser"));

    return user || null;
  });
  const handleSignin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleSignout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    // 3 value trong provider share cho toàn App, và page nào cũng có thể lấy để sử dụng
    <UserContext.Provider value={{ currentUser, handleSignin, handleSignout }}>
      {children}
    </UserContext.Provider>
  );
};

// khi nào mình gọi useUserContext thì sẽ trả ra 3 giá tri currentUser, handleSignin, handleSignout trong UserContext.Provider
export const useUserContext = () => {
  const value = useContext(UserContext);
  return value;
};

// export Biến toàn cục nên import vào App.js để bọc các router vào trong
export default UserProvider;
