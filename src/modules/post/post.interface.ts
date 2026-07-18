// import { PostStatus } from "../../../generated/prisma/enums";

import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPayload {
    title: string;
    content: String;
    thumbnail?: string;
    isFeatured?: boolean;
    status?: PostStatus
    tags: string[]
}
