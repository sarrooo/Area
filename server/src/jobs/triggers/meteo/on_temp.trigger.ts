import {saveTriggerData, TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";
import {each} from "async";
import config from "config";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    const onTempInputs = await getInputs(inputs);
    if (isNaN(onTempInputs.treshold)) {
        Logging.warning('Trigger on_temp fail: No treshold provided');
        return false;
    }

    if (userServicesTrigger.length === 0 || !userServicesTrigger[0].RefreshToken) {
        Logging.warning('Trigger on_temp fail: No user service token provided');
        return false;
    }

    const apiKey = config.get<string>('weatherConfig.apiKey');
    if (!apiKey) {
        Logging.warning('Trigger on_temp fail: No weather api key provided');
        return false;
    }
    const data = await getNewTemp(apiKey);
    if (!data) {
        Logging.warning('Trigger on_temp fail: fail to fetch mention');
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

const getNewTemp = async (apiKey: string): Promise<NewMessagesGmail[]> => {
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

const getInputs = async (inputs: TrireaInputs[]): Promise<OnTempInputs> => {
    const onTempInputs : OnTempInputs = {treshold: NaN};
    await each(inputs, async (input) => {
        if (input.triggerInputType.name === 'on_temp.treshold' && input.value) {
            onTempInputs.treshold = parseInt(input.value);
        }
    });
    return onTempInputs;
}

type OnTempInputs = {
    treshold: number;
}

