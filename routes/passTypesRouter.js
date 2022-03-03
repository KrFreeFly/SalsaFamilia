import express from 'express';
import {
    createPasstype,
    updatePasstype,
    deletePasstype,
    getPassTypes,
} from "../controllers/passtypesController.js";

const passTypesRouter = express.Router();

passTypesRouter.post("/", createPasstype);
passTypesRouter.put("/:idPassType", updatePasstype);
passTypesRouter.delete("/:idPassType", deletePasstype);
passTypesRouter.get("/", getPassTypes);

export default passTypesRouter;