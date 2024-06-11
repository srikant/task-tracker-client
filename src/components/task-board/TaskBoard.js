import React, { useEffect, useState } from "react";
import "./TaskBoard.scss";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import TaskCard from "../../utils/task-card/TaskCard";
import { useSelector } from "react-redux";
import useFeatchPost from "../../hooks/useFetchPosts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditTask from "./EditTask";
import TaskDetails from "./TaskDetails";

const TaskBoard = () => {
  const { data: storeData } = useSelector((state) => state.taskSlice);
  const { loading, error, data } = useFeatchPost(); //useSelector((state) => state.taskSlice);
  const [openTaskList, setOpenTaskList] = useState([]);
  const [inProgressTaskList, setInProgressTaskList] = useState([]);
  const [inVerificationTaskList, setInVerificationTaskList] = useState([]);
  const [doneTaskList, setDoneTaskList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [showEditTask, setShowEditTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState();
  const [taskDetails, setTaskDetails] = useState();
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("data: ", data);
    console.log("storeData: ", storeData);
    //if (Array.isArray(data) && Array.isArray(storeData)) {
    if (Array.isArray(data)) {
      setTaskList(data);
      //setTaskList(data.concat(storeData));
    }
    /*  if (data) {
      setTaskList(...data, ...storeData);
    } */
  }, [data, storeData]);

  const handleDelete = (_id) => {
    axios
      .delete("http://localhost:3001/deleteTask/" + _id)
      .then((res) => {
        console.log(res);
        setTaskList(taskList.filter((task) => task._id !== _id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (taskList) {
      setOpenTaskList(taskList.filter((task) => task.taskStatus === "Open"));
      setInProgressTaskList(
        taskList.filter((task) => task.taskStatus === "InProgress")
      );
      setInVerificationTaskList(
        taskList.filter((task) => task.taskStatus === "InVerification")
      );
      setDoneTaskList(taskList.filter((task) => task.taskStatus === "Done"));
    }
  }, [taskList]);

  /*   const openDrawer = () => {
    setShowEditTask(true);
  }; */
  const closeDrawer = () => {
    setShowEditTask(false);
    setShowTaskDetails(false);
  };

  const handlePreviewIcon = (task) => {
    console.log("task: ", task);
    setTaskDetails(task);
    setShowTaskDetails(true);
  };

  const handleEditIcon = (taskObj) => {
    console.log("taskObj: ", taskObj);
    setTaskToEdit(taskObj);
    setShowEditTask(true);
  };
  /* const setTaskToEditInState = (taskObj) => {
    console.log("taskObj: ", taskObj);
    setTaskToEdit(taskObj);
  }; */

  const updateTask = (updateObj) => {
    console.log("updatedObj: ", updateObj);
    console.log("tasktoedit: ", taskToEdit._id);

    const updatedItems = taskList.map((obj) =>
      obj._id === taskToEdit._id ? { ...updateObj, _id: taskToEdit._id } : obj
    );
    console.log("updatedItems: ", updatedItems);
    setTaskList(updatedItems);
    setShowEditTask(false);
  };
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div className="taskboard-container">
      <div className="taskTitle-container">
        <div>
          <h3>Task Board</h3>
        </div>

        <div className="add-task-btn">
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/add-new-task");
            }}
          >
            Add Task
          </Button>
        </div>
      </div>
      {/* Task Stages */}
      <div className="task-stage-flex-container">
        <div className="task-stage-flex-item">
          <h5>OPEN</h5>
          {openTaskList &&
            openTaskList.map((task) => {
              return (
                <TaskCard
                  handleDelete={handleDelete}
                  _id={task._id}
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                  taskStatus={task.taskStatus}
                  closeDrawer={closeDrawer}
                  handleEditIcon={handleEditIcon}
                  handlePreviewIcon={handlePreviewIcon}
                />
              );
            })}
          {/*<TaskCard
            title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            description="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, "
          />*/}
        </div>
        <div className="task-stage-flex-item">
          <h5>IN PROGRESS</h5>
          {inProgressTaskList &&
            inProgressTaskList.map((task) => {
              return (
                <TaskCard
                  handleDelete={handleDelete}
                  _id={task._id}
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                  taskStatus={task.taskStatus}
                  closeDrawer={closeDrawer}
                  handleEditIcon={handleEditIcon}
                  handlePreviewIcon={handlePreviewIcon}
                ></TaskCard>
              );
            })}
        </div>
        <div className="task-stage-flex-item">
          <h5>IN VERIFICATION</h5>
          {inVerificationTaskList &&
            inVerificationTaskList.map((task) => {
              return (
                <TaskCard
                  handleDelete={handleDelete}
                  _id={task._id}
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                  taskStatus={task.taskStatus}
                  closeDrawer={closeDrawer}
                  handleEditIcon={handleEditIcon}
                  handlePreviewIcon={handlePreviewIcon}
                />
              );
            })}
        </div>
        <div className="task-stage-flex-item">
          <h5>DONE</h5>
          {doneTaskList &&
            doneTaskList.map((task) => {
              return (
                <TaskCard
                  handleDelete={handleDelete}
                  _id={task._id}
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                  taskStatus={task.taskStatus}
                  closeDrawer={closeDrawer}
                  handleEditIcon={handleEditIcon}
                  handlePreviewIcon={handlePreviewIcon}
                />
              );
            })}
        </div>
      </div>
      <EditTask
        showEditTask={showEditTask}
        closeDrawer={closeDrawer}
        updateTask={updateTask}
        taskToEdit={taskToEdit}
      />
      <TaskDetails
        showTaskDetails={showTaskDetails}
        taskDetails={taskDetails}
        closeDrawer={closeDrawer}
      />
    </div>
  );
};

export default TaskBoard;
