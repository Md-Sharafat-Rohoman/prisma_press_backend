import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();



router.post('/register', userController.registerUser);




router.get('/me',
    //     (req: Request, res: Response, next: NextFunction) => {
    //     console.log(req.cookies);
    //     const { accessToken } = req.cookies;
    //     const verifiedToken = jwtUtils.verifiedToken(accessToken, config.jwt_access_secret);

    //     if (typeof verifiedToken === "string") {
    //         throw new Error(verifiedToken)
    //     }
    //     const { id, name, email, role } = verifiedToken;
    //     const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];
    //     if (!requiredRoles.includes(role)) {
    //         return res.status(httpStatus.FORBIDDEN).json({
    //             success: false,
    //             statusCode: httpStatus.FORBIDDEN,
    //             message: "Forbidden . You don't have permission to access this resource"
    //         })
    //     }
    //     req.user = {
    //         id,
    //         name,
    //         email,
    //         role
    //     }

    //     next();
    // }, 
    auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    userController.getMyProfile);
router.put('/my-profile', auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.updateMyProfile);



export const userRouter = router;