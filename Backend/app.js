import express from "express";
import dbconnect from "./db/dbconnect.js";
import userRoutes from "./routes/user.routes.js";
import submitRoutes from "./routes/submit.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dbconnect();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors());

app.use("/users" , userRoutes);
app.use("/submit" , submitRoutes);

export default app;

