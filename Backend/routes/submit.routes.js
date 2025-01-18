import { Router } from "express";
import * as submitcontroller from "../controller/submit.controller.js";
import { authuser } from "../middleware/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router.post("/create" , 
    authuser,
    body('name').isString().withMessage('Name of user is required'),
    body('company').isString().withMessage('Name of company is required'),
    body('country').isString().withMessage('Country of user is required'),
    submitcontroller.createcompqueslist
)

router.get("/view" , 
    submitcontroller.getalllist
)

router.get("/view/:userId", authuser , submitcontroller.getUserSubmissions);

export default router;
