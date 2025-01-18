import { Submit } from "../models/submit.model.js";

export const createSubmission = async function ({name ,country , company , questions , userId }){
      if(!name || !country || !company || !userId || questions.length===0){
        throw new Error("All feilds are reqired");
      }
      
      const submitedlist = await Submit.create({
       name,
       country,
       company,
       questions,
       userId
      })
      await submitedlist.save();
    return submitedlist;
}
