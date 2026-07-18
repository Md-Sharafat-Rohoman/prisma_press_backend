import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.registerUserIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created Successfully",
        data: { user }
    })
})
const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const { accessToken } = req.cookies;
    // console.log(req.user, "user request")
    // const verifiedToken = jwtUtils.verifiedToken(accessToken, config.jwt_access_secret);

    // if (typeof verifiedToken === "string") {
    //     throw new Error(verifiedToken)
    // }

    const profile = await userService.getMyProfileIntoDB(req.user?.id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched Successfully",
        data: { profile }
    })
})
const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updateProfile = await userService.updateMyProfileIntoDB(req.user?.id as string, req.body as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Updated my profile",
        data: { updateProfile }
    })
})


export const userController = {
    registerUser,
    getMyProfile,
    updateMyProfile
}