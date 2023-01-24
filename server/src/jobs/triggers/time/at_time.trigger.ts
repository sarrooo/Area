import {each} from "async";
import Logging from "~/lib/logging";
import * as console from "console";
import {TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";

export const start = async (inputs: TrireaInputs[], userServices: UserService[]): Promise<boolean> => {
    const actualTime = Date.now();
    const atTimeInputs = await getInputs(inputs);


    if (!atTimeInputs.timer) {
        Logging.warning('Trigger time_at fail: No timer provided');
        return false;
    }

    return atTimeInputs.timer <= actualTime;
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