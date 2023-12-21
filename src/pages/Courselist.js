import React, { useEffect , useState} from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getCourses,resetState } from "../features/course/courseSlice";
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
    title: "Learning Time",
    dataIndex: "learningTime",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Number of Lesson",
    dataIndex: "NumberofLesson",
  },
  {
    title: "Total Rating",
    dataIndex: "totalrating",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Courselist = () => {
  const [open, setOpen] = useState(false);
  const [courseId,setCourseId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCourseId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getCourses());
  }, []);
  const CourseState = useSelector((state) => state.course.courses);
  const data1 = [];
  for (let i = 0; i < CourseState.length; i++) {
    data1.push({
      key: i + 1,
      title: CourseState[i].title,
      description: CourseState[i].description,
      category: CourseState[i].category,
      learningTime: CourseState[i].learningTime,
      NumberofLesson: CourseState[i].NumberofLesson,
      totalrating: CourseState[i].totalrating,
      action: (
        <>
          <Link to={`/admin/course/${CourseState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={()=>showModal(CourseState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteACourse = async (e) => {
    await dispatch(deleteCourse(e));
    setOpen(false);
    dispatch(getCourses());
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
          deleteACourse(courseId);
          
        }}
        title="Delete this?"
      />
    </div>
  );
};

export default Courselist;