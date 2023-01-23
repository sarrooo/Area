import cron from 'node-cron';
import {prisma} from "~/lib/prisma";
import {each} from "async";


//TODO: 1. Create a list of each task to run
//TODO: 2. Create a function to run each task
//TODO: 3. If a trigger return true, then run the reaction
cron.schedule('* * * * *', async () => {
    const date = new Date();
    const trireas = await getTrireas();

    await each(trireas, async (trirea) => {
        console.log(trirea.id);
    });

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