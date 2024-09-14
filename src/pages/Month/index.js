import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
const Month = () => {
  //1. open or close date selector
  const [visibleDate, setVisibleDate] = useState(false);
  // 4.1 new a selected state
  const [groupMonthBillList, setGroupMonthBillList] = useState([]);
  // 2.format time state
  const [time, setTime] = useState(() => {
    return dayjs().format("YYYY-MM");
  });

  const onConfirm = (date) => {
    setVisibleDate(false);
    const formatTime = dayjs(date).format("YYYY-MM");
    setTime(formatTime);
    // 4.2 click comfirm button, get current month
    // use the date as key, find the match month group (lodash)
    // Ensure that monthGroupBill[formatTime] is an array
    const list = monthGroupBill[formatTime] || [];
    setGroupMonthBillList(list);
  };
  // 4.3 calculate useMemo
  const monthGroupResult = useMemo(() => {
    // set up default value
    if (!Array.isArray(groupMonthBillList)) {
      console.error("groupMonthBillList is not an array:", groupMonthBillList);
      return {
        totalPay: 0,
        totalReceive: 0,
        balance: 0,
      };
    }
    const pay = groupMonthBillList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = groupMonthBillList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [groupMonthBillList]);
  /* 
  3.bill data groupd by month
    -get data from store
    -useMemo  secondary process of dataset, also need a dependent
    -group data -lodash _.groupBy
    -format date - dayjs
  */
  const { billList } = useSelector((state) => state.bill);
  // Group bills by month
  const monthGroupBill = useMemo(() => {
    // return 出计算后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  /* 
  4.Calculate statistics for the month
    -new a selected state
    -click comfirm button, get current month
    -use the date as key, find the match month group 
    -calculate useMemo
    -render
  */
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div
            className="date"
            onClick={() => {
              setVisibleDate(true);
            }}
          >
            <span className="text">{time}月账单</span>
            <span className={visibleDate ? "arrow" : "arrow expand"}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthGroupResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">
                {monthGroupResult.income.toFixed(2)}
              </span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthGroupResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            max={new Date()}
            visible={visibleDate}
            onClose={() => {
              setVisibleDate(false);
            }}
            onCancel={() => {
              setVisibleDate(false);
            }}
            onConfirm={onConfirm}
          />
        </div>
        {/* 单日列表统计 */}
        {100}
      </div>
    </div>
  );
};

export default Month;
