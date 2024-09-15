import classNames from "classnames";
import "./index.scss";
import { React, useMemo, useState } from "react";
import { billTypeToName } from "@/contants/index.js";
import Icon from "@/components/Icon/Icon";

/* 
图标组件
1.封装一个图标组件
2.将图案类型作为props传递给组件，生成图标地址
3.展示
*/
const DailyBill = ({ dailyKey, dailyBillList }) => {
  const [visible, setVisible] = useState(false);
  const dailyBillResult = useMemo(() => {
    if (!Array.isArray(dailyBillList)) {
      console.error("groupMonthBillList is not an array:", dailyBillList);
      return {
        totalPay: 0,
        totalIncome: 0,
        balance: 0,
      };
    }

    const totalPay = dailyBillList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);

    const totalIncome = dailyBillList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      totalPay,
      totalIncome,
      balance: totalPay + totalIncome,
    };
  }, [dailyBillList]);
  return (
    <div className={classNames("dailyBill")}>
      <div
        className="header"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <div className="dateIcon">
          <span className="date">{dailyKey}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span className={visible ? "arrow expand" : "arrow"}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dailyBillResult.totalPay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">
              {dailyBillResult.totalIncome.toFixed(2)}
            </span>
          </div>
          <div className="balance">
            <span className="money">{dailyBillResult.balance.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {dailyBillList.map((item) => {
          return (
            <div className="bill" key={item.id}>
              {/* 图标 */}
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames("money", item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DailyBill;
