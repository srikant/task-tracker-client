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
import axios from "axios";
import "./EditTask.scss";

const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "InProgress" },
  { label: "In Verification", value: "InVerification" },
  { label: "Done", value: "Done" },
];
const EditTask = (props) => {
  const [taskTitle, setTaskTitle] = useState(props.taskToEdit?.taskTitle);
  const [taskDescription, setTaskDescription] = useState(
    props.taskToEdit?.taskDescription
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
    console.log("props: ", props);
    axios
      .put("http://localhost:3001/updateTask/" + props.taskToEdit._id, {
        taskTitle,
        taskDescription,
        taskStatus,
      })
      .then((result) => {
        console.log(result);
        props.updateTask({
          taskTitle: taskTitle,
          taskDescription: taskDescription,
          taskStatus: taskStatus,
        });
      });
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
        open={props.showEditTask}
        onClose={() => props.closeDrawer()}
        PaperProps={{ sx: { width: 400, padding: "1rem" } }}
      >
        <h3>Edit Task</h3>
        <TextInput
          label="Task Title"
          handleTextInput={titleHandler}
          defaultValue={props.taskToEdit?.taskTitle}
        />
        <TextArea
          label="Task Desc"
          handleTextArea={descHandler}
          defaultValue={props.taskToEdit?.taskDescription}
        />
        <Box sx={{ minWidth: 120, width: "90%", marginBottom: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskStatus}
              defaultValue={taskStatus ? taskStatus : "Open"}
              label="Status"
              onChange={statusHandler}
            >
              {statusOptions.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <div>
          <Button
            variant="contained"
            sx={{ marginRight: ".5rem" }}
            onClick={updateBtnHandler}
          >
            Update
          </Button>
          <Button variant="outlined" onClick={() => props.closeDrawer()}>
            Cancel
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default EditTask;
