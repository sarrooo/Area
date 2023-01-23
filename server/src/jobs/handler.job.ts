import cron from 'node-cron';


//TODO: 1. Create a list of each task to run
//TODO: 2. Create a function to run each task
//TODO: 3. If a trigger return true, then run the reaction
cron.schedule('* * * * *', () => {
    const date = new Date();

    console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);
});