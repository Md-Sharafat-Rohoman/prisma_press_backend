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
    const transactionResult = await prisma.$transaction(
        async (tx) => {
            // const totalPosts = await tx.post.count();

            // const totalPublishedPosts = await tx.post.count({
            //     where: {
            //         status: PostStatus.PUBLISHED
            //     }
            // })
            // const totalDraftPosts = await tx.post.count({
            //     where: {
            //         status: PostStatus.DRAFT
            //     }
            // })
            // const totalArchivedPosts = await tx.post.count({
            //     where: {
            //         status: PostStatus.ARCHIVED
            //     }
            // })

            // const totalComments = await tx.comment.count();
            // const totalApprovedComments = await tx.comment.count({
            //     where: {
            //         status: CommentStatus.APPROVED
            //     }
            // })
            // const totalRejectedComments = await tx.comment.count({
            //     where: {
            //         status: CommentStatus.REJECT
            //     }
            // })

            // not a good approach
            // const allPosts = await tx.post.findMany();
            // let totalPostViews = 0;
            // allPosts.forEach((post) => {
            //     totalPostViews = totalPostViews + post.view
            // })


            // Good approach
            // const totalPostsViewsAggregate = await tx.post.aggregate({
            //     _sum: {
            //         view: true
            //     }
            // })
            // const totalPostsViews = totalPostsViewsAggregate._sum.view
            // return {
            //     totalPosts,
            //     totalPublishedPosts,
            //     totalDraftPosts,
            //     totalArchivedPosts,
            //     totalComments,
            //     totalApprovedComments,
            //     totalRejectedComments,
            //     totalPostViews,
            //     totalPostsViews
            // }
            const [
                totalPosts,
                totalPublishedPosts,
                totalDraftPosts,
                totalArchivedPosts,
                totalComments,
                totalApprovedComments,
                totalRejectedComments,
                totalPostsViewsAggregate
            ] = await Promise.all([
                await tx.post.count(),
                await tx.post.count({
                    where: {
                        status: PostStatus.PUBLISHED
                    }
                }),
                await tx.post.count({
                    where: {
                        status: PostStatus.DRAFT
                    }
                }),
                await tx.post.count({
                    where: {
                        status: PostStatus.ARCHIVED
                    }
                }),
                await tx.comment.count(),
                await tx.comment.count({
                    where: {
                        status: CommentStatus.APPROVED
                    }
                }),
                await tx.comment.count({
                    where: {
                        status: CommentStatus.REJECT
                    }
                }),
                await tx.post.aggregate({
                    _sum: {
                        view: true
                    }
                }),
                // totalPostsViewsAggregate._sum.view
            ])
            return {
                totalPosts,
                totalPublishedPosts,
                totalDraftPosts,
                totalArchivedPosts,
                totalComments,
                totalApprovedComments,
                totalRejectedComments,
                // totalPostViews,
                totalPostsViews: totalPostsViewsAggregate._sum.view
            }
        }
    )
    return transactionResult;
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

    // await prisma.post.update({
    // where: {
    //     id: postId
    // },
    // data: {
    //     view: {
    //         increment: 1
    //     }
    // }
    // })
    // // throw new Error("Fake Error")
    // const post = await prisma.post.findUniqueOrThrow({
    // where: {
    //     id: postId
    // },
    // include: {
    //     author: {
    //         omit: {
    //             password: true
    //         }
    //     },
    //     comment: {
    //         where: {
    //             status: CommentStatus.APPROVED
    //         },
    //         orderBy: {
    //             createdAt: "desc"
    //         }
    //     },
    //     _count: {
    //         select: {
    //             comment: true
    //         }
    //     }
    // }
    // })
    // return post

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            await tx.post.update({
                where: {
                    id: postId
                },
                data: {
                    view: {
                        increment: 1
                    }
                }
            });
            // throw new Error("Fake Error")
            const post = await tx.post.findUniqueOrThrow({
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
            return post;
        }
    )
    return transactionResult;
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