import {each} from "async";
import Logging from "~/lib/logging";
import * as console from "console";

//TODO: Make a function to parse the params into an interface
export const start = async (trireaTriggerInputs: {value: string | null, triggerInput: {name: string, type: string}}[]) => {
    let timer: number = NaN;
    const actualTime = Date.now();

    await each(trireaTriggerInputs, async (input) => {
        console.log("Timer: " + input.value + " - " + input.triggerInput.name);
       if (input.triggerInput.name === 'at_time.timer' && input.value) {
           console.log("Timer: " + input.value);
           timer = Date.parse(input.value);
       }
    });

    if (!timer) {
        Logging.warning('Trigger time_at fail: No timer provided');
        return;
    }

    if (timer <= actualTime) {
        Logging.info('Trigger time_at: The timer is in the future, the reaction will be executed ...');
        return;
    }

    console.log('Execution of the action…');
};