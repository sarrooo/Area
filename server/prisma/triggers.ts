import {Prisma} from "@prisma/client";

// CREATE TRIGGERS & SERVICES IF NOT EXIST
export const triggersPopulate:Prisma.TriggerCreateInput[] = [
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
    {
        name: 'on_commit',
        description: 'trigger when a commit is pushed on a repository',
        service: {
            connectOrCreate: {
                where: {
                    name: 'github',
                },
                create: {
                    name: 'github',
                    description: 'Github is a platform for developers',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png',
                    requiredSubscription: true,
                }
            }
        }
    },
    {
        name: 'on_mention',
        description: 'trigger when a user is mentioned',
        service: {
            connectOrCreate: {
                where: {
                    name: 'github',
                },
                create: {
                    name: 'github',
                    description: 'Github is a platform for developers',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png',
                    requiredSubscription: true,
                }
            }
        }
    },
    {
        name: 'new_mail',
        description: 'trigger when a new mail is received',
        service: {
            connectOrCreate: {
                where: {
                    name: 'google',
                },
                create: {
                    name: 'google',
                    description: 'Google is a search engine',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google-favicon-2015.png/1200px-Google-favicon-2015.png',
                    requiredSubscription: true,
                }
            }
        }
    },
    {
        name: 'new_playlist',
        description: 'trigger when a new playlist is created',
        service: {
            connectOrCreate: {
                where: {
                    name: 'spotify',
                },
                create: {
                    name: 'spotify',
                    description: 'Spotify is a music streaming service',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png',
                    requiredSubscription: true,
                }
            }
        }
    }
]

// TRIGGERS INPUTS TYPE
export const triggersInputsPopulate:Prisma.TriggerInputTypeCreateInput[] = [
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
        name: 'on_commit.repository',
        description: 'Repository to watch',
        type: 'String',
        mandatory: true,
        trigger: {
          connect: {
                name: 'on_commit',
          }
        }
    },
    {
        name: 'on_commit.owner',
        description: 'Owner of the repository',
        type: 'String',
        mandatory: true,
        trigger: {
            connect: {
                name: 'on_commit',
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
    {
        name: 'on_commit.commit_message',
        description: 'Commit message',
        type: 'String',
        trigger: {
            connect: {
                name: 'on_commit',
            }
        }
    },
    {
        name: 'on_mention.link',
        description: 'Link to the mention',
        type: 'String',
        trigger: {
            connect: {
                name: 'on_mention',
            }
        }
    },
    {
        name: 'new_playlist.playlist_id',
        description: 'Id of the new playlist',
        type: 'String',
        trigger: {
            connect: {
                name: 'new_playlist',
            }
        }
    }
]