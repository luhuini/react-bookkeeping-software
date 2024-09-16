import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/contants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { modifyBillList } from "@/store/modules/billSlice";
import { useDispatch } from "react-redux";
/* 
支出与收入功能实现
-1准备控制的状态
-2点击按钮切换状态
-3适配按钮样式
-4适配数据显示

*/

/* 
新增账单功能实现
-组件中收集接口数据，type，money，date，usefor
-在redux中编写异步代码
-点击保存提交action
*/
const New = () => {
  const navigate = useNavigate();
  // 1准备控制的状态
  const [billType, setBillType] = useState("pay");
  const [money, setMoney] = useState(0);
  const [useFor, setUseFor] = useState("");
  const saveMoney = (money) => {
    setMoney(money);
    console.log(money);
  };
  const getUseFor = (type) => {
    setUseFor(type);
  };
  const dispatch = useDispatch();
  const saveBill = () => {
    const billData = {
      type: billType,
      money: billType === "pay" ? -money : money,
      time: new Date(),
      useFor: useFor,
    };
    dispatch(modifyBillList(billData));
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            onClick={() => {
              setBillType("pay");
            }}
            shape="rounded"
            className={classNames("pay", billType === "pay" ? "selected" : "")}
          >
            支出
          </Button>
          <Button
            onClick={() => {
              setBillType("income");
            }}
            className={classNames(
              "income",
              billType === "income" ? "selected" : ""
            )}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{2024 - 10}</span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                value={money}
                onChange={saveMoney}
                placeholder="0.00"
                type="number"
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    // selected
                    <div
                      onClick={() => {
                        getUseFor(item.type);
                      }}
                      className={classNames(
                        "item",
                        useFor === item.type ? "selected" : ""
                      )}
                      key={item.type}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button onClick={saveBill} className="btn save">
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
