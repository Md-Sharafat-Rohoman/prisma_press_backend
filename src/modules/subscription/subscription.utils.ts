import Stripe from "stripe";
import { SubscriptionStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

export const getPeriodEnd = (payload: Stripe.Subscription) => {
    const currentPeriodEndInMilliseconds = payload.items.data[0]?.current_period_end!;
    const currentPeriodEnd = new Date(currentPeriodEndInMilliseconds * 1000);

    return currentPeriodEnd
}

export const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {
    // const session: Stripe.Checkout.Session = event.data.object;
    const userId = session.metadata?.userId;
    const stripeCustomerId = session.customer as string;
    const stripeSubscriptionId = session.subscription as string;
    if (!userId || !stripeCustomerId || !stripeSubscriptionId) {
        // throw new Error("Webhook Failed");
        console.log("Webhook : Missing value for creating checkout session");
        return;
    }
    const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId as string);
    // const currentPeriodStart = stripeSubscription.items.data[0]?.current_period_start;
    const currentPeriodEnd = getPeriodEnd(stripeSubscription);

    console.log(currentPeriodEnd, "end");
    // const paymentIntent = event.data.object;
    await prisma.subscription.upsert({
        where: {
            userId
        },
        create: {
            userId,
            stripeCustomerId,
            stripeSubscriptionId,
            status: "ACTIVE",
            currentPeriodEnd
        },
        update: {
            stripeCustomerId,
            stripeSubscriptionId,
            status: "ACTIVE",
            currentPeriodEnd
        }
    })
}
export const handleChangeSubscription = async (payload: Stripe.Subscription) => {
    const stripeSubscriptionId = payload.id;
    const status = payload.status === "active" ? SubscriptionStatus.ACTIVE :
        payload.status === "trialing" ? SubscriptionStatus.ACTIVE :
            payload.status === "canceled" ? SubscriptionStatus.CANCEL :
                SubscriptionStatus.EXPIRED;
    const currentPeriodEnd = getPeriodEnd(payload);
    const isSubscriptionExists = await prisma.subscription.findUnique({
        where: {
            stripeSubscriptionId
        }
    })
    if (!isSubscriptionExists) {
        console.log(`Webhook: No subscription found for subscription id : ${stripeSubscriptionId}`)
        return;
    }
    await prisma.subscription.update({
        where: {
            stripeSubscriptionId
        },
        data: {
            status,
            currentPeriodEnd
        }
    })

}