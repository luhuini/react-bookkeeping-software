import classNames from "classnames";
import "./index.scss";
import { React, useMemo } from "react";

const DailyBill = ({ dailyKey, dailyBillList }) => {
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
      <div className="header">
        <div className="dateIcon">
          <span className="date">{dailyKey}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span className={classNames("arrow", "expand")}></span>
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
    </div>
  );
};
export default DailyBill;
