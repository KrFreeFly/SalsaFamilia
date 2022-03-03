import { Router } from 'express';
import {getAnalytics} from "../controllers/analyticsController.js";
const router = Router();

router.route("/")
    .get(getAnalytics);

export default router;