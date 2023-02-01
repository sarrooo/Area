import {Prisma} from "@prisma/client";

// CREATE TRIGGERS & SERVICES IF NOT EXIST
export const triggers:Prisma.TriggerCreateInput[] = [
    {
        name: 'every',
        description: 'triggers every X minutes',
        service: {
            connectOrCreate: {
                where: {
                    name: 'time',
                },
                create: {
                    name: 'time',
                    description: 'Time module',
                    image: '.',
                    requiredSubscription: false,
                }
            }
        }
    },
    {
        name: 'at_time',
        description: 'triggers at x time',
        service: {
            connectOrCreate: {
                where: {
                    name: 'time',
                },
                create: {
                    name: 'time',
                    description: 'Time module',
                    image: '.',
                    requiredSubscription: false,
                }
            }
        }
    },
    {
        name: 'new_tweet_from',
        description: 'trigger when a X user post a new tweet',
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