import { Router } from "express";
import tasksRouter from "./tasks";

const mainRouter = Router();

mainRouter.use("/tasks", tasksRouter);

export default mainRouter;
