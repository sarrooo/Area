import {saveTriggerData, TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    if (userServicesTrigger.length === 0 || !userServicesTrigger[0].RefreshToken) {
        Logging.warning('new_mail trigger: No user service token provided');
        return false;
    }
    const googleToken = userServicesTrigger[0].RefreshToken;
    const data = await getNewMail(googleToken);
    if (!data) {
        Logging.warning('new_mail trigger fail: fail to fetch mention');
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
        await saveTriggerData(trireaId, data[0].id);
        return true
    }
    return false;
};

const getNewMail = async (googleToken: string): Promise<NewMessagesGmail[]> => {
    try {
        const { data } = await axios.get<any>(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages`,
            {
                headers: {
                    Authorization: `Bearer ${googleToken}`,
                },
            });
        return data.messages;
    } catch (err: any) {
        Logging.warning('new_mail trigger fail: fail to fetch new mail');
        return [];
    }
}

type NewMessagesGmail = {
    id: string,
    threadId: string,
}

