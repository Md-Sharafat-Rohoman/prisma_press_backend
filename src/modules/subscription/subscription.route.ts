import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
import { subscriptionController } from "./subscription.controller";

const router = Router();
router.post('/checkout', auth(Role.ADMIN, Role.AUTHOR, Role.USER), subscriptionController.createCheckoutSession);
router.post('/webhook', subscriptionController.handleWebhook);
router.get('/status', auth(Role.ADMIN, Role.AUTHOR, Role.USER), subscriptionController.getSubscriptionStatus);


export const subscriptionRouter = router;