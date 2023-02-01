import cron from "node-cron";
import {prisma} from "~/lib/prisma";
import {each} from "async";
import * as console from "console";

cron.schedule('* * * * *', async () => {
    const date = new Date();
    const trireas = await getTrireas();
    let triggered = false;

    await each(trireas, async (trirea) => {
        const trigger = await loadTrigger(trirea.trigger);
        const userServiceTrigger = await getUserServiceTrigger(trirea.userId, trirea.trigger.service.name);
        const userServiceReaction = await getUserServiceReaction(trirea.userId, trirea.reaction.service.name);
        triggered = await trigger.start(trirea.id, trirea.trireaTriggerInputs, userServiceTrigger, trirea.prevTriggerData);
        if (triggered) {
            const triggerOutputs = await getReactionsInputs(trirea.id);
            const reaction = await loadReaction(trirea.reaction);
            await reaction.start(trirea.id, triggerOutputs, userServiceReaction);
        }
    });

    console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);
});

const loadReaction = async (reaction: {name: string, service: {name: string}}) => {
    const reactionPath = `~/jobs/reactions/${reaction.service.name}/${reaction.name}.reaction`;
    return await import(reactionPath);
}

const loadTrigger = async (trigger: {name: string, service: {name: string}}) => {
    const triggerPath = `~/jobs/triggers/${trigger.service.name}/${trigger.name}.trigger`;
    return await import(triggerPath);
}

const getTrireas = async () => {
    return prisma.trirea.findMany(
        {
            where: {
                enabled: true,
            },
            select: {
                id: true,
                prevTriggerData: true,
                trigger: {
                    select: {
                        name: true,
                        service: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                reaction: {
                    select: {
                        name: true,
                        service: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                trireaTriggerInputs: {
                    select: {
                        value: true,
                        triggerInputType: {
                            select: {
                                name: true,
                                type: true,
                            }
                        }
                    }
                },
                trireaReactionInputs: {
                    select: {
                        value: true,
                        reactionInputType: {
                            select: {
                                name: true,
                                type: true,
                            }
                        }
                    }
                },
                userId: true,
            },
        }
    );
}

const getUserServiceTrigger = async (userId: number, triggerService: string) => {
    return prisma.userService.findMany({
        where: {
            userId: userId,
            service: {
                name: triggerService,
            }
        }
    })
}

const getReactionsInputs = async(trireaId: number) => {
    return prisma.trireaReactionInput.findMany({
        where: {
            trireaId: trireaId,
        },
        select: {
            value: true,
            reactionInputType: {
                select: {
                    name: true,
                    type: true,
                }
            }
        }
    })
}

const getUserServiceReaction = async (userId: number, reactionService: string) => {
    return prisma.userService.findMany({
        where: {
            userId: userId,
            service: {
                name: reactionService,
            }
        }
    })
}

export const saveTriggerData = async (trireaId: number, data: string) => {
    return prisma.trirea.update({
        where: {
            id: trireaId,
        },
        data: {
            prevTriggerData: data,
        }
    });
}

export const transmitOutput = async (trireaId: number, data: string, outputName: string) => {
    return prisma.trireaReactionInput.updateMany({
        where: {
            trireaId: trireaId,
            triggerOutputType: {
                name: outputName,
            }
        },
        data: {
            value: data,
        }
    })
}

export type TrireaInputs = {
    value: string | null;
    triggerInputType: {
        name: string;
        type: string;
    }
}

export type TrireaOutputs = {
    value: string | null;
    reactionInputType: {
        name: string;
        type: string;
    }
}