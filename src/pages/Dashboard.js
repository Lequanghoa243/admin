import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { Column } from "@ant-design/plots";
import { Table } from "antd";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Course",
    dataIndex: "Course",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      students: 38,
    },
    {
      type: "Feb",
      students: 52,
    },
    {
      type: "Mar",
      students: 61,
    },
    {
      type: "Apr",
      students: 145,
    },
    {
      type: "May",
      students: 48,
    },
    {
      type: "Jun",
      students: 38,
    },
    {
      type: "July",
      students: 38,
    },
    {
      type: "Aug",
      students: 38,
    },
    {
      type: "Sept",
      students: 38,
    },
    {
      type: "Oct",
      students: 38,
    },
    {
      type: "Nov",
      students: 38,
    },
    {
      type: "Dec",
      students: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "students",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      student: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Learned Student Statics</h3>
        <div>
          {/* <Column {...config} /> */}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;