import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import config from "./config";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { authRouter } from "./modules/auth/auth.route";
import { commentRouter } from "./modules/comment/comment.route";
import { postRouter } from "./modules/post/post.route";
import { userRouter } from "./modules/user/user.route";


const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        statuscode: httpStatus.OK,
        message: "Express Server Created",
        data: {}
    })
})
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);


app.use(notFound);
app.use(globalErrorHandler);


export default app