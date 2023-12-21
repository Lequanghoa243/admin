import React, { useEffect , useState} from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, resetState,deleteCategory } from "../features/category/categorySlice";
import { Link } from "react-router-dom";
import CustomModal from "../Component/Custommodal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const data1=[];
const Courselist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId,setCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getCategory());
  
   
  }, []);
  const CategoryState = useSelector((state) => state.category.categorys);
  const data1 = [];
  for (let i = 0; i < CategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: CategoryState[i].title,
      action: (
        <>
          <Link to={`/admin/category/${CategoryState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={()=>showModal(CategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteACategory = async (e) => {
    await dispatch(deleteCategory(e))
    setOpen(false);
    dispatch(getCategory());
  }
  return (
    <div>
      <h3 className="mb-4 title">Course List</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={()=>{
          deleteACategory(categoryId);
          
        }}
        title="Delete this?"
      />
    </div>
  );
};

export default Courselist;