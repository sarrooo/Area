import {each} from "async";
import {saveTriggerData, TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    const everyInputs = await getInputs(inputs);
    if (!prevTriggerData) {
        prevTriggerData = new Date().toString();
        await saveTriggerData(trireaId, prevTriggerData);
    } else {
        const prevDate = new Date(prevTriggerData);
        prevDate.setMinutes(prevDate.getMinutes() + everyInputs.freq);
        const actualDate = new Date();
        if (prevDate < actualDate) {
            prevTriggerData = actualDate.toString();
            await saveTriggerData(trireaId, prevTriggerData);
            return true;
        }
    }
    return false
};

const getInputs = async (inputs: TrireaInputs[]): Promise<EveryInputs> => {
    const everyInputs : EveryInputs = {freq: NaN};
    await each(inputs, async (input) => {
        if (input.triggerInputType.name === 'every.freq' && input.value) {
            everyInputs.freq = parseInt(input.value);
        }
    });
    return everyInputs;
}

type EveryInputs = {
    freq: number;
}