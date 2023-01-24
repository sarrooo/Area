import {TrireaOutputs} from "~/jobs/handler.job";
import * as console from "console";

export const start = async (inputs: TrireaOutputs[]) => {
    console.log(inputs);
};