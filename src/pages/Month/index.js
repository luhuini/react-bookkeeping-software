import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "loadsh";
const Month = () => {
  //1. open or close date selector
  const [visibleDate, setVisibleDate] = useState(false);
  // 2.format time state
  const [time, setTime] = useState(() => {
    return dayjs().format("YYYY-MM");
  });

  const onConfirm = (date) => {
    setVisibleDate(false);
    setTime(dayjs(date).format("YYYY-MM"));
  };
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
  console.log(monthGroupBill, 11);

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
              <span className="money">100</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">200</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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
