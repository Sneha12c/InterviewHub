import { Submit } from "../models/submit.model.js";
import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createSubmission } from "../services/submit.service.js";

export const createcompqueslist = async function (req , res){
    const errors = validationResult(req);
    if(!errors){
     return res.status(400).json({errors : errors.array()});
    }
    const {name , country , company ,questions , userId} = req.body;
    
    try {
     const submitedlist = await createSubmission({name ,country , company ,questions , userId });    
     res.status(200).json({submitedlist});
    } catch (error) {
     console.log(error);
     res.status(500).send(error.message)
    }
}

export const getalllist = async function (req , res){
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const totalSubmissions = await Submit.countDocuments();
        const submissions = await Submit.find().skip(skip).limit(limit);
        
        res.status(200).json({
            submissions,
            totalPages: Math.ceil(totalSubmissions / limit),
            currentPage: page,
        }); 
    }catch(err){
     res.status(500).send(err.message);
    }
}

export const getUserSubmissions = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        if (!userId) {
            return res.status(400).send("Please login or register");
        }

        const skip = (page - 1) * limit;

        const userSubmissions = await Submit.find({ userId })
            .sort({ createdAt: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const totalSubmissions = await Submit.countDocuments({ userId });

        res.status(200).json({
            data: userSubmissions,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalSubmissions / limit),
            totalSubmissions,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
