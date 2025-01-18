import mongoose from "mongoose";

function arrayLimit(val) {
    return val.length > 0;
}

const submitSchema = mongoose.Schema({
    name : {
     type : String,
     required : true,
     trim : true,
    },
    company : {
        type : String,
        required : true,
        trim : true,
    },
    country : {
        type : String,
        required : true,
        trim : true,
    },
    questions : {
        type : [String],
        required : true,
        validate : [arrayLimit, "At least one question is required"],
    },
    userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true
    }
} , {timestamps : true});

export const Submit = mongoose.model('Submit' , submitSchema);

