import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
/* 
1️⃣ 配置/@，进行路径解析

-路径解析
  -安装craco，安装到开发环境
  npm i -D @craco/craco
  -项目根目录下创建配置文件
  craco.config.js
  -配置文件中添加路径解析配置
  -包文件中配置启动和打包命令

-联想路径配置
  -在项目目录添加jsconfig.json ，加入后vs code会自动读取配置帮助我们自动联想提示

  -步骤
    根目录下新增配置文件 jsonfig.json
    添加路径提示配置

2️⃣ mock数据
json- server
-安装：npm i -D json-server
-准备mock数据json文件夹
-添加启动命令： start : "server":"json-server ./server/data.json --port8888"
-访问接口进行测试
*/
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
