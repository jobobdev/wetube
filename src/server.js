
import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();

// logger는 request가 finished 되면 발동한다.
const logger = morgan("dev");


app.set("view engine", "pug")
app.set("views", process.cwd()+ "/src/views")
app.use(logger);
// 아래의 middleware는 router전에 위치해야 한다.
app.use(express.urlencoded({extended: true}));

app.use('/', globalRouter);
app.use("/videos", videoRouter);
app.use('/users', userRouter);

export default app;


