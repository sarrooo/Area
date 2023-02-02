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

// TRIGGERS INPUTS TYPE
export const reactionsInputsPopulate:Prisma.TriggerInputTypeCreateInput[] = [
    {
        name: 'at_time.time',
        description: 'Time at which the trigger will be executed',
        type: 'String',
        mandatory: true,
        trigger: {
            connect: {
                name: 'at_time',
            }
        }
    },
    {
        name: 'new_tweet_from.username',
        description: 'Username to watch',
        type: 'String',
        mandatory: true,
        trigger: {
            connect: {
                name: 'new_tweet_from',
            }
        }
    },
    {
        name: 'every.freq',
        description: 'frequency of the trigger',
        type: 'Int',
        mandatory: true,
        trigger: {
            connect: {
                name: 'every',
            }
        }
    },
]

// TRIGGERS OUTPUT TYPE
export const triggersOutputPopulate:Prisma.TriggerOutputTypeCreateInput[] = [
    {
        name: 'new_tweet_from.tweet_id',
        description: 'Tweet from the user',
        type: 'String',
        trigger: {
            connect: {
                name: 'new_tweet_from',
            }
        }
    },
]