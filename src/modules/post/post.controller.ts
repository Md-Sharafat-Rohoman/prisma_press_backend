import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.createPost(req.body, req.user?.id as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post created successfully",
        data: { result }
    })
})
const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postService.getAllPosts();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get all post retrieved",
        data: { posts }
    })
})
const getPostStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})
const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = await postService.getMyPosts(req.user?.id as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get my post retrieved",
        data: { authorId }
    })
})
const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId
    if (!postId) {
        throw new Error("Post id Required in params")
    }
    const post = await postService.getPostById(postId as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get single post retrieved",
        data: { post }
    })
})
const updatePosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})
const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})


export const postController = {
    createPost,
    getAllPosts,
    getPostStats,
    getMyPosts,
    getPostById,
    updatePosts,
    deletePost

}