import express from 'express';
import { index } from "../controllers/homeController.js";

const homeRouter = express.Router();

homeRouter.get("/", index);

export default homeRouter;