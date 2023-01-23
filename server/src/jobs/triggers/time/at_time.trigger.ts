import {each} from "async";

export const start = async (params: any) => {
    await each(params, async (param) => {
        console.log(param);
    });
    console.log('Execution of the action…');
};