import React, { useEffect, useState } from "react";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PreviewIcon from "@mui/icons-material/Preview";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "./TaskCard.scss";
const TaskCard = (props) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { _id, taskTitle, taskDescription, taskStatus } = props;

  useEffect(() => {
    console.log("status: ", taskStatus);
  }, []);
  return (
    <div className="task-card-container">
      <div className="task-title-flex-container">
        <h5 className="task-title">{props.taskTitle}</h5>
        <IconButton aria-label="view">
          <PreviewIcon
            fontSize="small"
            onClick={() => {
              props.handlePreviewIcon({ ...props });
            }}
          />
        </IconButton>
        <IconButton aria-label="edit">
          <BorderColorIcon
            fontSize="small"
            onClick={() => {
              console.log("props", props);
              props.handleEditIcon({ ...props });
              //props.setTaskToEditInState({ ...props });
              //   props.openDrawer();
            }}
          />
        </IconButton>

        <IconButton aria-label="delete">
          <DeleteIcon
            fontSize="small"
            color="error"
            onClick={() => {
              setShowConfirmDelete(true);
            }}
          />
        </IconButton>
      </div>
      <p className="task-description">{props.taskDescription}</p>
      {showConfirmDelete && (
        <Dialog
          open={() => {}}
          onClose={() => {}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-description">
            Confirm delete ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowConfirmDelete(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                props.handleDelete(props._id);
                setShowConfirmDelete(false);
              }}
              variant="outlined"
              color="error"
            >
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default TaskCard;
