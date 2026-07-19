import { CommentStatus, PostStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface"



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

    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            view: {
                increment: 1
            }
        }
    })
    // throw new Error("Fake Error")
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comment: {
                where: {
                    status: CommentStatus.APPROVED
                },
                orderBy: {
                    createdAt: "desc"
                }
            },
            _count: {
                select: {
                    comment: true
                }
            }
        }
    })
    return post
}
const updatePosts = async (postId: string, payload: IUpdatePostPayload, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })
    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("Your are not the owner of this post!")
    }
    const result = await prisma.post.update({
        where: {
            id: postId
        },
        data: payload,
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comment: true
        }
    })
    return result;
}
const deletePost = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })
    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("Your are not the owner of this post!")
    }
    await prisma.post.delete({
        where: {
            id: postId
        }
    })

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