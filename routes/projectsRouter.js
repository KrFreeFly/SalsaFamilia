import express from 'express';

import { getProjects } from "../controllers/projectsController.js";

const projectsRouter = express.Router();

projectsRouter.use("/", getProjects);

export default projectsRouter;