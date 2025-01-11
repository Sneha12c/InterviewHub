import { validationResult } from "express-validator";
import {User} from "../models/user.model.js";
import { createuser } from "../services/user.services.js";
import redisClient from "../services/redis.service.js";

export const createusercontroller = async function (req , res) {
    const errors = validationResult(req);
    if(!errors){
     return res.status(400).json({errors : errors.array()});
    }

    try {
       const user = await createuser(req.body);
       const token = await user.generatejwt();
       delete user._doc.password;
       res.status(201).json({user , token});
    } catch (error) {
      res.status(400).send(error.message);
    }
}

export const logincontroller = async function (req , res){
   const errors = validationResult(req);
   
   if(!errors){
    res.status(400).json({error : errors.array()});
   }
   try {
    const {email , password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user){
     res.status(400).json({errors : 'User does not exist'});
    }
    const validpassword = await user.isvalidpassword(password);
    if(!validpassword){
     res.status(400).json({errors : "Invalid credential"});
    }

    const token = await user.generatejwt();
    delete user._doc.password;

    res.status(201).json({user , token});
    } catch (error) {
     res.status(400).json({error: error.message}); 
    }
}

export const profilecontroller = async function (req , res) {
   
   return res.status(200).json({
     user : req.user
   }) 
}

export const logoutcontroller = async function () {
    try {
     const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
     if(!token){
       res.status(200).send({error : "Unauthorised error"});
     }
     redisClient.set(token , 'logout' ,'EX', 60*60*24);

     res.status(200).json({ message : "Logout successfully"});
    } catch (error) {
      res.status(400).send(error.message);
    }
}
