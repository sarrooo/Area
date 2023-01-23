import {each} from "async";
import Logging from "~/lib/logging";
import * as console from "console";
import {TrireaInputs} from "~/jobs/handler.job";

export const start = async (inputs: TrireaInputs[]) => {
    const actualTime = Date.now();
    const atTimeInputs = await getInputs(inputs);


    if (!atTimeInputs.timer) {
        Logging.warning('Trigger time_at fail: No timer provided');
        return;
    }

    if (atTimeInputs.timer <= actualTime) {
        Logging.info('Trigger time_at: The timer is in the future, the reaction will be executed ...');
        return;
    }

    console.log('Execution of the action…');
};

const getInputs = async (inputs: TrireaInputs[]): Promise<AtTimeInputs> => {
    let atTimeInputs : AtTimeInputs = {timer: NaN};
    await each(inputs, async (input) => {
        if (input.triggerInput.name === 'at_time.timer' && input.value) {
            atTimeInputs.timer = Date.parse(input.value);
        }
    });
    return atTimeInputs;
}

type AtTimeInputs = {
    timer: number;
}