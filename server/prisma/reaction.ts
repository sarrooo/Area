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
    {
        name: 'create_gist',
        description: 'Create a gist',
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
        name: 'create_issue_comment',
        description: 'Create a comment on an issue',
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
        name: 'send_mail',
        description: 'Send a mail',
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
        name: 'add_track_to_playlist',
        description: 'Add a track to a playlist',
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

// REACTIONS INPUTS TYPE
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
    {
        name: 'create_gist.description',
        description: 'Description of the gist',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'create_gist',
            }
        }
    },
    {
        name: 'create_gist.content',
        description: 'Content of the gist',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'create_gist',
            }
        }
    },
    {
        name: 'create_gist.public',
        description: 'Is the gist public',
        type: 'Boolean',
        mandatory: true,
        reaction: {
            connect: {
                name: 'create_gist',
            }
        }
    },
    {
        name: 'create_issue_comment.owner',
        description: 'Owner of the repository',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'create_issue_comment',
            }
        }
    },
    {
        name: 'create_issue_comment.repository',
        description: 'Repository name',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'create_issue_comment',
            }
        }
    },
    {
        name: 'create_issue_comment.issue',
        description: 'Issue number',
        type: 'Int',
        mandatory: true,
        reaction: {
            connect: {
                name: 'create_issue_comment',
            }
        }
    },
    {
        name: 'create_issue_comment.comment',
        description: 'Comment to add',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'create_issue_comment',
            }
        }
    },
    {
        name: 'add_track_to_playlist.playlist_id',
        description: 'Playlist id',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'add_track_to_playlist',
            }
        }
    },
    {
        name: 'add_track_to_playlist.artist_name',
        description: 'Artist name',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'add_track_to_playlist',
            }
        }
    },
    {
        name: 'add_track_to_playlist.track_name',
        description: 'Track name',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'add_track_to_playlist',
            }
        }
    },
    {
        name: 'send_mail.to',
        description: 'Mail recipient',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'send_mail',
            }
        }
    },
    {
        name: 'send_mail.subject',
        description: 'Mail subject',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'send_mail',
            }
        }
    },
    {
        name: 'send_mail.content',
        description: 'Mail content',
        type: 'String',
        mandatory: true,
        reaction: {
            connect: {
                name: 'send_mail',
            }
        }
    },
]