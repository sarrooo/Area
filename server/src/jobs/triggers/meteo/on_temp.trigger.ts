import {saveTriggerData, TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";
import {each} from "async";
import config from "config";
import {prisma} from "~/lib/prisma";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    const onTempInputs = await getInputs(inputs);
    if (isNaN(onTempInputs.treshold)) {
        Logging.warning('Trigger on_temp fail: No treshold provided');
        return false;
    }
    if (!onTempInputs.city) {
        Logging.warning('Trigger on_temp fail: No city provided');
        return false;
    }

    const apiKey = config.get<string>('weatherConfig.apiKey');
    if (!apiKey) {
        Logging.warning('Trigger on_temp fail: No weather api key provided');
        return false;
    }
    const data = await getNewTemp(onTempInputs.city, apiKey);
    if (!data || isNaN(data.current.temp_c)) {
        Logging.warning('Trigger on_temp fail: fail to fetch new temp');
        return false;
    }

    if (onTempInputs.treshold <= data.current.temp_c) {

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

const getNewTemp = async (city: string, apiKey: string): Promise<NewTemp> => {
    try {
        const { data } = await axios.get<NewTemp>(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`,);
        return data;
    } catch (err: any) {
        Logging.warning('new_mail trigger fail: fail to fetch new mail');
        return {current: {temp_c: NaN}};
    }
}


const getInputs = async (inputs: TrireaInputs[]): Promise<OnTempInputs> => {
    const onTempInputs : OnTempInputs = {treshold: NaN, city: ''};
    await each(inputs, async (input) => {
        if (input.triggerInputType.name === 'on_temp.treshold' && input.value) {
            onTempInputs.treshold = parseInt(input.value);
        }
        if (input.triggerInputType.name === 'on_temp.city' && input.value) {
            onTempInputs.city = input.value;
        }
    });
    return onTempInputs;
}

type NewTemp = {
    current: {
        temp_c: number;
    }
}

type OnTempInputs = {
    treshold: number;
    city: string;
}

