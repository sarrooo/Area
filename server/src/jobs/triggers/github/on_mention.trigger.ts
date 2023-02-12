import {TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    return false;
};