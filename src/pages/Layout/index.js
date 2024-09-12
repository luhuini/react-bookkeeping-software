import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      i am layout
      <Outlet />
    </div>
  );
};
export default Layout;
