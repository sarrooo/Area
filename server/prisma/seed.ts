import {prisma} from "~/lib/prisma";
import {each} from "async";
import {triggersInputsPopulate, triggersOutputPopulate, triggersPopulate} from "./triggers";
import {reactionsInputsPopulate, reactionsPopulate} from "./reaction";
import Logging from "~/lib/logging";
import * as console from "console";

//TODO: Use Create{Object}InputMany instead of Create{Object}Input for each
//IMPORTANT: Don't delete the loggings, it cancel the lazy execution of the async functions
async function main() {
    //TRIGGERS
    for (const trigger of triggersPopulate) {
        await prisma.trigger.create({
            data: trigger
        }).then(function(triggerResult) {
            Logging.info("Trigger created: " + triggerResult.name)
        })
    }

    for (const triggerInput of triggersInputsPopulate) {
        await prisma.triggerInputType.create({
            data: triggerInput
        }).then(function(triggerInputResult) {
            Logging.info("Trigger input created: " + triggerInputResult.name)
        })
    }

    for (const triggerOutput of triggersOutputPopulate) {
        await prisma.triggerOutputType.create({
            data: triggerOutput
        }).then(function(triggerOutputResult) {
            Logging.info("Trigger output created: " + triggerOutputResult.name)
        })
    }

    //REACTIONS
    for (const reaction of reactionsPopulate) {
        await prisma.reaction.create({
            data: reaction
        }).then(function(reactionResult) {
            Logging.info("Reaction created: " + reactionResult.name)
        })
    }

    for (const reactionInput of reactionsInputsPopulate) {
        await prisma.reactionInputType.create({
            data: reactionInput
        }).then(function(reactionInputResult) {
            Logging.info("Reaction input created: " + reactionInputResult.name)
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })