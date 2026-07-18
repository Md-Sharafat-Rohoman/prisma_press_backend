

import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { commentController } from "./comment.controller";

const router = Router();
router.post('/', auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);
router.get('/author/:authorId', commentController.getCommentByAuthorId);
router.get('/:commentId', commentController.getCommentByCommentId);
router.put('/:commentId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.updateComment);
router.delete('/:commentId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.deleteComment);
router.put('/:commentId/moderate', auth(Role.ADMIN), commentController.moderateComment);

export const commentRouter = router;