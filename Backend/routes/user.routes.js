import { Router } from "express";
import * as usercontroller from "../controller/user.controller.js";
import { body } from "express-validator";
import { authuser } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register" , 
     body('email').isEmail().withMessage("Email must be a valid address"),
     body('password').isLength({min: 3}).withMessage(" password length must be 3"),
     usercontroller.createusercontroller
)

router.post("/login" , 
    body('email').isEmail().withMessage("Email must be a valid address"),
    body('password').isLength({min: 3}).withMessage(" password length must be 3"),
    usercontroller.logincontroller
)

router.get("/profile" , authuser , usercontroller.profilecontroller);

router.post("/logout" , authuser , usercontroller.logoutcontroller);

export default router;
