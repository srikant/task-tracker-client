import React from "react";
import { Route, Routes as AppRoutes } from "react-router-dom";
import AddNewTask from "./task-board/AddNewTask";
import TaskBoard from "./task-board/TaskBoard";
import PageNotFound from "./PageNotFound";
const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/add-new-task" element={<AddNewTask />} />
      <Route path="/" element={<TaskBoard />} />
      <Route path="*" element={<PageNotFound />} />
    </AppRoutes>
  );
};

export default Routes;
