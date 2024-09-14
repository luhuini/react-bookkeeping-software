import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useState, useMemo, useEffect } from "react";
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
    // use the date as key, find the match month group (monthGroupBill)
    // Ensure that monthGroupBill[formatTime] is an array
    /* 
    	monthGroupBill 是一个对象，它的属性是月份字符串，值是该月份的账单列表。
	    •	formatTime 是一个变量，其值是格式化后的日期字符串（例如 "2024-09"）。
	    •	monthGroupBill[formatTime] 表示访问 monthGroupBill 对象中键为 formatTime 的属性值。这种方式允许你使用变量来动态地访问对象的属性。
    */
    const list = BillGrouping[formatTime] || [];
    setGroupMonthBillList(list);
  };

  /* 
  3.bill data groupd by month
    -get data from store
    -useMemo  secondary process of dataset, also need a dependent
    -group data -lodash _.groupBy
    -format date - dayjs
  */
  const { billList } = useSelector((state) => state.bill);
  // Group bills by month 将账单按月分组
  const BillGrouping = useMemo(() => {
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
  // 4.3 calculate useMemo
  const monthGroupResult = useMemo(() => {
    if (!Array.isArray(groupMonthBillList)) {
      console.error("groupMonthBillList is not an array:", groupMonthBillList);
      return {
        totalPay: 0,
        totalIncome: 0,
        balance: 0,
      };
    }

    const totalPay = groupMonthBillList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);

    const totalIncome = groupMonthBillList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      totalPay,
      totalIncome,
      balance: totalPay + totalIncome,
    };
  }, [groupMonthBillList]);

  /* 5.inital month data
   */
  useEffect(() => {
    const date = dayjs().format("YYYY-MM");
    // 边界值控制
    if (BillGrouping && typeof BillGrouping === "object") {
      setGroupMonthBillList(BillGrouping[date] || []);
    }
  }, [BillGrouping]);
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
              <span className="money">
                {monthGroupResult.totalPay.toFixed(2)}
              </span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">
                {monthGroupResult.totalIncome.toFixed(2)}
              </span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">
                {monthGroupResult.balance.toFixed(2)}
              </span>
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
