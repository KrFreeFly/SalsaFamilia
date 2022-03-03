import express from "express";
import { login } from "../controllers/loginController.js";

const router = express.Router()

router.route('/')
    .get((req, res) => {
        console.log('login')
        res.render('login');
    })
    .post(login)

export default router