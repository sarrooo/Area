import cron from 'node-cron';
import {prisma} from "~/lib/prisma";
import {each} from "async";
import * as console from "console";


//TODO: 1. Get all trireas :white_check_mark:
//TODO: 1.2 Loop over each trigger :white_check_mark:
//TODO: 1.3 Get the inputs in an array forms :white_check_mark:
//TODO: 1.4 Get the trigger function from the path :white_check_mark:
//TODO: 1.5 Run the trigger function with the inputs :white_check_mark:
//TODO: 1.6 If the trigger function return true, then run the reaction :white_check_mark:
//TODO: 1.7 Get the reaction function from the path :white_check_mark:
//TODO: 1.7.1 Get the inputs in an array forms
//TODO: 1.8 Run the reaction function with the inputs
//TODO: 1.9 Save the result in the database
//TODO: 2. Create a function to run each task
//TODO: 3. If a trigger return true, then run the reaction
//TODO 4: Create a function to sanitize the name of the trigger and reaction

cron.schedule('* * * * *', async () => {
    const date = new Date();
    const trireas = await getTrireas();
    let triggered: boolean = false;

    await each(trireas, async (trirea) => {

        const trigger = await loadTrigger(trirea.trigger);
        const userServiceTrigger = await getUserServiceTrigger(trirea.userId, trirea.trigger.service.name);
        const userServiceReaction = await getUserServiceReaction(trirea.userId, trirea.reaction.service.name);

        triggered = await trigger.start(trirea.trireaTriggerInputs, userServiceTrigger);
        if (triggered) {
            const reaction = await loadReaction(trirea.reaction);
            await reaction.start(trirea.trireaReactionInputs, userServiceReaction);
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
                        triggerInput: {
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
                        triggerOutput: {
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

export type TrireaInputs = {
    value: string | null;
    triggerInput: {
        name: string;
        type: string;
    }
}

export type TrireaOutputs = {
    value: string | null;
    triggerOutput: {
        name: string;
        type: string;
    }
}