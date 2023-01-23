import {each} from "async";

export const start = async (trireaTriggerInputs: {value: string | null, triggerInput: {name: string, type: string}}[]) => {
    await each(trireaTriggerInputs, async (input) => {
        console.log(`Value : ${input.value}`);
    });
    console.log('Execution of the action…');
};