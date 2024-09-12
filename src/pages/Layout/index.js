import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";

const Layout = () => {
  return (
    <div>
      i am layout
      <div>
        <Button color="primary">全局</Button>
        <div className="pink-theme">
          <Button color="primary">局部</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default Layout;
