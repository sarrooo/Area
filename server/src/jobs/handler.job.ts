import cron from 'node-cron';
import {prisma} from "~/lib/prisma";
import {each} from "async";


//TODO: 1. Get all trireas
//TODO: 1.2 Loop over each trigger
//TODO: 1.3 Get the inputs in an array forms
//TODO: 1.4 Get the trigger function from the path
//TODO: 1.5 Run the trigger function with the inputs
//TODO: 1.6 If the trigger function return true, then run the reaction
//TODO: 1.7 Get the reaction function from the path
//TODO: 1.8 Run the reaction function with the inputs
//TODO: 1.9 Save the result in the database
//TODO: 2. Create a function to run each task
//TODO: 3. If a trigger return true, then run the reaction
cron.schedule('* * * * *', async () => {
    const date = new Date();
    const trireas = await getTrireas();

    await each(trireas, async (trirea) => {
        console.log(trirea.id);
    });

    const x = '~/jobs/triggers/time/at_time.trigger'
    const trigger = await import(x);
    trigger.start()

    console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);
});

const getTrireas = () => {
    return prisma.trirea.findMany(
        {
            where: {
                enabled: true,
            }
        }
    );
}