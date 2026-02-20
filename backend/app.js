import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,  
    credentials : true
}))

app.use(express.json({limit : "10kb"}))  
app.use(express.urlencoded({extended: true, limit: "10kb"})) 
app.use((express.static("public"))) 
app.use(cookieParser()) 


// import userRouter from "./routes/user.routes.js"
// import adminRouter from "./routes/admin.routes.js";

// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/admin", adminRouter);  // ← add this

import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

app.use("/users", userRouter);   
app.use("/admin", adminRouter);  // ← add this line

export {app}