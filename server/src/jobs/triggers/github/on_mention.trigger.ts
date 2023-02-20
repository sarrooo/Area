import {saveTriggerData, TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    if (userServicesTrigger.length === 0 || !userServicesTrigger[0].RefreshToken) {
        return false;
    }
    const githubToken = userServicesTrigger[0].RefreshToken;
    const data = await getUserMention(githubToken);
    if (!data) {
        Logging.warning('Trigger on mention fail: fail to fetch mention');
        return false;
    }

    if (data.length === 0) {
        if (!prevTriggerData) {
            await saveTriggerData(trireaId, data.length.toString());
            return false;
        }
        return false;
    }

    if (!prevTriggerData) {
        await saveTriggerData(trireaId, data[0].id);
        return false;
    }

    if (prevTriggerData !== data[0].id) {
        await saveTriggerData(trireaId, data.length.toString());
        return true
    }
    return false;
};

const getUserMention = async (githubToken: string): Promise<NewUserMention[]> => {
    try {
     const { data } = await axios.get<any>(
            `https://api.github.com/user/notifications?participating=true`,
            {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                },
            });
        return data;
    } catch (err: any) {
        return [];
    }
}

type NewUserMention = {
    id: string,
    subject: {
        url: string,
    }
}

