import { Router } from "express";
import Task from "../models/Task";
import {
  renderTaks,
  createTask,
  renderTaskEdit,
  updateTask,
  deleteTask,
  toogleTask,
} from "../controllers/tasks.controller";

const router = Router();

router.get("/", renderTaks);

router.post("/tasks/add", createTask);

router.get("/tasks/:id/edit", renderTaskEdit);

router.post("/tasks/:id/edit", updateTask);

router.get("/tasks/:id/delete", deleteTask);

router.get("/tasks/:id/toogleDone", toogleTask);

export default router;
