import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/user/userSlice";


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const User = () => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const userstate = useSelector((state) => state.user.users);
  const data1 = [];
  for (let i = 0; i < userstate.length; i++) {
    if (userstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: userstate[i].firstname + " " + userstate[i].lastname,
        email: userstate[i].email,
        mobile: userstate[i].mobile,
      });
    }
  }


  return (
    <div>
      <h3 className="mb-4 title">User</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default User;