import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextInput from "../../utils/text-input/TextInput";
import TextArea from "../../utils/text-area/TextArea";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewTask } from "../../redux-store/taskSlice";
import axios from "axios";
import "./AddNewTask.scss";
const AddNewTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("Open");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleTextInput = (event) => {
    setTaskTitle(event.target.value);
    //console.log("value", event.target.value);
  };
  const handleTextArea = (event) => {
    setTaskDescription(event.target.value);
    // console.log("value", event.target.value);
  };
  const handleSaveBtn = () => {
    console.log("title: ", taskTitle);
    console.log("Description: ", taskDescription);
    console.log("Status: ", taskStatus);

    axios
      .post("http://localhost:3001/createTask", {
        taskTitle,
        taskDescription,
        taskStatus,
      })
      .then((result) => {
        console.log("result.data: ", result.data);
        dispatch(
          addNewTask({
            _id: result.data._id,
            taskTitle: result.data.taskTitle,
            taskDescription: result.data.taskDescription,
            taskStatus: result.data.taskStatus,
          })
        );
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="add-new-task-container">
      <h4>Add New Task</h4>
      <TextInput
        placeholder="Enter Task Title"
        label="Task Title"
        handleTextInput={handleTextInput}
      />
      <TextArea
        placeholder="Enter Task Description"
        label="Task Description"
        handleTextArea={handleTextArea}
      />
      <Button
        variant="contained"
        onClick={() => handleSaveBtn()}
        color="primary"
        sx={{ marginRight: "1rem" }}
      >
        Save
      </Button>
      <Button variant="outlined" onClick={() => navigate(-1)} color="primary">
        Cancel
      </Button>
    </div>
  );
};

export default AddNewTask;
