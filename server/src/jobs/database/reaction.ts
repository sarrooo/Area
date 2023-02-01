import {Prisma} from "@prisma/client";

// CREATE REACTIONS & SERVICES IF NOT EXIST
export const reactionsPopulate :Prisma.ReactionCreateInput[] = [
    {
        name: 'send_message',
        description: 'Send a message to a user',
        service: {
            connectOrCreate: {
                where: {
                    name: 'twitter',
                },
                create: {
                    name: 'twitter',
                    description: 'Twitter is a social network',
                    image: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/langfr-220px-Twitter_Bird.svg.png',
                    requiredSubscription: true,
                }
            }
        }
    },
    {
        name: 'like_tweet',
        description: 'Like a tweet from a user',
        service: {
            connectOrCreate: {
                where: {
                    name: 'twitter',
                },
                create: {
                    name: 'twitter',
                    description: 'Twitter is a social network',
                    image: 'https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/langfr-220px-Twitter_Bird.svg.png',
                    requiredSubscription: true,
                }
            }
        }
    },
]

// REACTIONS INPUTS
export const reactionsInputsPopulate:Prisma.ReactionInputTypeCreateInput[] = [
    {
        name: 'send_message.message',
        description: 'Message to send',
        type: 'String',
        mandatory: true,
        reaction: {
           connect: {
                  name: 'send_message',
           }
        }
    },
    {
        name: 'send_message.username',
        description: 'Send message to',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'send_message',
            }
        }
    },
    {
        name: 'like_tweet.tweet',
        description: 'Tweet to like',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'like_tweet',
            }
        }
    },
]