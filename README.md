
#Install npm:
1. Install router: npm i react-router-dom:
   Trong file App import như sau 
<!-- import { BrowserRouter, Routes, route } from "react-router-dom";
<!-- import Home from "./modules/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
} -->
2. Install reactQuery: npm i @tanstack/react-query
Vào file index.js thêm như sau: 
<!-- import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); -->
<!-- const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
); -->
3. npm i dayjs dùng để format lại ngày tháng đẹp hơn 

4. npm install react-hook-form tiện cho việc validation form sign-in/sign-up


#Cấu trúc Project 
src:
- Components/:
  - Chứa các component thuần về UI được tái sử dụng ở nhiều nơi
  - các component này thường không bao gồm logic của ứng dụng (call API,..)
  - VD: Button, card, header, footer, sidebar...
  
- modules/module-name/:
  - chứa các component cấu thành 1 page hoặc 1 chức năng cụ thể 

- layouts: 
  - chứa các components layout cho react-router

- apis:
  - setup thư viện API
  - set up các hàm API

*Note: Nếu như Footer muốn xuất hiện nhiều trang thì để ở file components như Header , nếu không bỏ vào file moduls
*Style Bootstrap nên dùng với scss modules, material UI nên xài với CSS-in-JS
