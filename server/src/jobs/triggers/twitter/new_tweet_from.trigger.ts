import {each} from "async";
import Logging from "~/lib/logging";
import {saveTriggerData, transmitOutput, TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import axios from "axios";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    const newTweetFromInputs = await getInputs(inputs);

    if (!newTweetFromInputs.username) {
        Logging.warning('Trigger new_tweet fail: No username provided');
        return false;
    }

    if (userServicesTrigger.length === 0 || !userServicesTrigger[0].RefreshToken) {
        Logging.warning('Trigger new_tweet fail: No user service token provided');
        return false;
    }

    const twitterToken = userServicesTrigger[0].RefreshToken;
    const data = await getTweetFromAUser(newTweetFromInputs.username, twitterToken);
    if (data.meta.result_count === -1) {
        Logging.warning('Trigger new_tweet fail: fail to fetch tweet');
        return false;
    }

    if (data.meta.result_count === 0) {
        if (!prevTriggerData) {
            await saveTriggerData(trireaId, data.meta.result_count.toString());
            return false;
        }
        return false;
    }

    if (!prevTriggerData) {
        await saveTriggerData(trireaId, data.meta.newest_id);
        return false;
    }

    //TODO: Find a way to not hardcode outputName
    if (prevTriggerData !== data.meta.newest_id) {
        Logging.info('data: ' + prevTriggerData + ' ' + data.meta.newest_id);
        await saveTriggerData(trireaId, data.meta.newest_id);
        await transmitOutput(trireaId, data.meta.newest_id, 'new_tweet_from.tweet_id')
        return true;
    }

    return false;
};

const getTweetFromAUser = async (username: string, twitterToken: string): Promise<NewTweetFromResponse> => {
    try {
        const {data} = await axios.get<NewTweetFromResponse>(
            `https://api.twitter.com/2/tweets/search/recent?query=from:${username}`,
            {
                headers: {
                    Authorization: `Bearer ${twitterToken}`,
                },
            });
        return data;
    } catch (err: any) {
        Logging.warning('Trigger new_tweet: fail to send message to target' + err);
        return {
            meta: {newest_id: "", oldest_id: "", result_count: -1}
        }
    }
}

const getInputs = async (inputs: TrireaInputs[]): Promise<NewTweetFromInputs> => {
    const newTweetFromInputs : NewTweetFromInputs = {username: ""};
    await each(inputs, async (input) => {
        if (input.triggerInputType.name === 'new_tweet_from.username' && input.value) {
            newTweetFromInputs.username = input.value;
        }
    });
    return newTweetFromInputs;
}

type NewTweetFromResponse = {
    meta: {
        newest_id: string;
        oldest_id: string;
        result_count: number;
    }
}

type NewTweetFromInputs = {
    username: string;
}
