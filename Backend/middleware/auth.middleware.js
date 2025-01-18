import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authuser = async function (req , res , next) {
    try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token ;
    if(!token){
      res.status(200).send({error : "Unauthorised error"});
    }
    const isblacklisted = await redisClient.get(token);
    if(isblacklisted){
     res.cookie('token' , '' ,{ httpOnly: true, secure: true });
     return res.status(401).send({ error : "Unauthorized user "});
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
      console.log(error);
      res.status(400).send({error : "Unauthorized User"});   
    }
}


