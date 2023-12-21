import React, { useEffect,useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLesson,resetState ,deleteLesson} from "../features/lesson/lessonSlice";
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
    title: "VideoURL",
    dataIndex: "videoURL",
  },
  {
    title: "Course",
    dataIndex: "course",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Lessonlist = () => {
  const [open, setOpen] = useState(false);
  const [lessonId,setLessonId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setLessonId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getLesson());
  }, []);
  const LessonState = useSelector((state) => state.lesson.lessons);
  const data1 = [];
  for (let i = 0; i < LessonState.length; i++) {
    data1.push({
      key: i + 1,
      title: LessonState[i].title,
      videoURL: LessonState[i].videoURL,
      course: LessonState[i].course,
      action: (
        <>
          <Link to={`/admin/lesson/${LessonState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={()=>showModal(LessonState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteALesson = async (e) => {
    await dispatch(deleteLesson(e));
    setOpen(false);
    dispatch(getLesson());
  }

  return (
    <div>
      <h3 className="mb-4 title">Lesson List</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={()=>{
          deleteALesson(lessonId);
          
        }}
        title="Delete this?"
      />
    </div>
  );
};

export default Lessonlist;