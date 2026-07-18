import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { postController } from "./post.controller";

const router = Router();
router.post('/', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/stats', auth(Role.ADMIN), postController.getPostStats);
router.get('/my-post', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.getMyPosts);
router.get('/:postId', postController.getPostById);
router.put('/:postId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.updatePosts);
router.delete('/:postId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.deletePost);


export const postRouter = router;