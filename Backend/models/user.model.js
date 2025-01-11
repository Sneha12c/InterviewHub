import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
     type : String,
     required : true,
     unique : true,
     trim : true
    },
    email : {
     type : String,
     required : true,
     unique : true,
     trim : true,
     maxLength : [50 , "Email must not have more than 20 character"],
     minLength : [4 , "Email must have greater than 4 character"]
    },
    password : {
     type : String,
     required : true,
     unique : true,
     trim : true,
     select : false,
    }
})

userSchema.statics.hashpassword = async function(password){
    return await bcrypt.hash(password , 10)
}

userSchema.methods.isvalidpassword = async function (password) {
    return await bcrypt.compare(password , this.password);
}

userSchema.methods.generatejwt = async function () {
    return jwt.sign({email : this.email} , process.env.JWT_SECRET , {expiresIn : '24h'});
}

export const User = mongoose.model('user' , userSchema);
