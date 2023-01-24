import {each} from "async";
import Logging from "~/lib/logging";
import * as console from "console";
import {TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import {prisma} from "~/lib/prisma";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[]): Promise<boolean> => {
    const actualTime = Date.now();
    const atTimeInputs = await getInputs(inputs);

    if (!atTimeInputs.timer) {
        Logging.warning('Trigger time_at fail: No timer provided');
        return false;
    }

    if (atTimeInputs.timer <= actualTime) {

        await prisma.trirea.update({
            where: {
                id: trireaId
            },
            data: {
                enabled: false
            }
        });
        return true
    }

    return false;
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