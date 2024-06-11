import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextInput from "../../utils/text-input/TextInput";
import TextArea from "../../utils/text-area/TextArea";
import "./EditTask.scss";

const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "InProgress" },
  { label: "In Verification", value: "InVerification" },
  { label: "Done", value: "Done" },
];
const TaskDetails = (props) => {
  const [taskTitle, setTaskTitle] = useState(props.taskToEdit?.taskTitle);
  const [taskDescription, setTaskDescription] = useState(
    props.taskToEdit?.description
  );
  const [taskStatus, setTaskStatus] = useState(props.taskToEdit?.taskStatus);

  useEffect(() => {
    if (props) {
      setTaskTitle(props.taskToEdit?.taskTitle);
      setTaskDescription(props.taskToEdit?.taskDescription);
      setTaskStatus(props.taskToEdit?.taskStatus);
    }
  }, [props]);
  const statusHandler = (event) => {
    console.log("value: ", event.target.value);
    setTaskStatus(event.target.value);
  };
  const titleHandler = (event) => {
    setTaskTitle(event.target.value);
  };
  const descHandler = (event) => {
    setTaskDescription(event.target.value);
  };
  const updateBtnHandler = () => {
    console.log("title: ", taskTitle);
    console.log("description: ", taskDescription);
    console.log("status: ", taskStatus);
  };

  /*  const dispatch = useDispatch();
  const navigate = useNavigate(); */
  const handleTextInput = (event) => {
    setTaskTitle(event.target.value);
    //console.log("value", event.target.value);
  };
  const handleTextArea = (event) => {
    setTaskDescription(event.target.value);
    // console.log("value", event.target.value);
  };
  /*   const handleSaveBtn = () => {
    console.log("title: ", taskTitle);
    console.log("Description: ", taskDescription);
    dispatch(
      addNewTask({
        id: Math.random(),
        title: taskTitle,
        description: taskDescription,
        status: "Open",
      })
    );
    navigate(-1);
  }; */
  return (
    <div>
      <Drawer
        anchor="right"
        open={props.showTaskDetails}
        onClose={() => props.closeDrawer()}
        PaperProps={{ sx: { width: 400, padding: "1rem" } }}
      >
        <h3>Task Details</h3>
        <h4>Title</h4>
        <p>{props.taskDetails?.taskTitle}</p>
        <h4>Description</h4>
        <p>{props.taskDetails?.taskDescription}</p>
        <h4>Status</h4>
        <p>{props.taskDetails?.taskStatus}</p>
      </Drawer>
    </div>
  );
};

export default TaskDetails;
