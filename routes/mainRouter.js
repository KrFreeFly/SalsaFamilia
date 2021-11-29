const express = require("express");
const router = express.Router()

const homeRouter = require("../routes/homeRouter.js"),
    authRouter = require('../routes/authRouter'),
    clientRouter = require("../routes/clientRouter"),
    passesRouter = require("../routes/passesRouter"),
    passtypesRouter = require("../routes/passtypesRouter"),
    incomeRouter = require("../routes/incomeRouter"),
    expencesRouter = require("../routes/expencesRouter"),
    projectsRouter = require('../routes/projectsRouter'),
    analyticsRouter = require("../routes/analyticsRouter");

//Define routes
router.use('/', homeRouter);
router.use('/', authRouter);
router.use('/passtypes', passtypesRouter);
router.use('/income', incomeRouter);
router.use('/expences', expencesRouter);
router.use('/projects', projectsRouter);
router.use('/passes', passesRouter);
router.use('/clients', clientRouter);
router.use('/analytics', analyticsRouter);

module.exports = router