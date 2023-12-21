import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {IoIosNotifications} from "react-icons/io"
import {
  AiOutlineDashboard,
  AiFillSetting,
  AiOutlineUser,
  AiFillBook
} from "react-icons/ai";
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const Mainlayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">Admin</span>
            <span className="lg-logo">Admin Bee Plus</span>
          </h2>
        </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['']}
              onClick={({ key }) => {
                if (key == "signout") {
                } else {
                  navigate(key);
                }
              }}
              items={[
                {
                  key: "",
                  icon: <AiOutlineDashboard className="fs-4" />,
                  label: "Dashboard",
                },
                {
                  key: "user",
                  icon: <AiOutlineUser className="fs-4" />,
                  label: "User",
                },
                {
                  key: "manage-category",
                  icon: <AiFillSetting className="fs-4" />,
                  label: "Manage Category",
                  children: [

                    {
                      key: "category",
                      icon: < BiCategory className="fs-4" />,
                      label: "Add Category",
                    },
                    {
                      key: "list-category",
                      icon: < BiCategory className="fs-4" />,
                      label: "Category List",
                    },
                    
                  ],
                },
                {
                  key: "manage-course",
                  icon: <AiFillSetting className="fs-4" />,
                  label: "Manage Course",
                  children: [

                    {
                      key: "course",
                      icon: <AiFillBook className="fs-4" />,
                      label: "Add Course",
                    },
                    {
                      key: "list-course",
                      icon: <AiFillBook className="fs-4" />,
                      label: "Course List",
                    },

                    
                  ],
                },
                {
                  key: "manage-lesson",
                  icon: <AiFillSetting className="fs-4" />,
                  label: "Manage Lesson",
                  children: [

                    {
                      key: "lesson",
                      icon: <FaPhotoVideo  className="fs-4" />,
                      label: "Add Lesson",
                    },
                    {
                      key: "list-lesson",
                      icon: <FaPhotoVideo  className="fs-4" />,
                      label: "Lesson List",
                    },
                    
                  ],
                },
              ]}
            />
          </Sider>
          <Layout>
          <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-admin.png"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Admin</h5>
                <p className="mb-0">Admin@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
               <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
              <Outlet/>
            </Content>
          </Layout>
        </Layout>
      );
}

export default Mainlayout