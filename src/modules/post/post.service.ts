import { PostStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"



const createPost = async (payload: ICreatePostPayload, userId: string) => {
    const result = await prisma.post.create({
        data: {
            title: payload.title,
            content: payload.content as string,
            thumbnail: payload.thumbnail || null,
            isFeatured: payload.isFeatured || false,
            status: payload.status || PostStatus.PUBLISHED,
            tags: payload.tags,
            authorId: userId
        }
    })
    return result;
}
const getAllPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comment: true
        }
    })
    return posts;
}
const getPostStats = async () => {

}
const getMyPosts = async (authorId: string) => {
    const result = await prisma.post.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            comment: true,
            author: {
                omit: {
                    password: true
                }
            },
            _count: {
                select: {
                    comment: true
                }
            }
        }
    })
    return result;
}
const getPostById = async (postId: string) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            view: {
                increment: 1
            }
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comment: true
        }

    })
    return updatedPost
}
const updatePosts = async () => {

}
const deletePost = async () => {

}


export const postService = {
    createPost,
    getAllPosts,
    getPostStats,
    getMyPosts,
    getPostById,
    updatePosts,
    deletePost

}