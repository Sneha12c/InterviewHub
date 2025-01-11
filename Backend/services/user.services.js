import {User} from "../models/user.model.js";

export const createuser = async function({username , email , password}){
  if(!username || !email || !password){
    throw new Error("All feilds are required");
  }

  const hashedpassword = await User.hashpassword(password);

  const user = await User.create({ username , email , password : hashedpassword});
  return user;
}

