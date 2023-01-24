import {TrireaInputs, TrireaOutputs} from "~/jobs/handler.job";
import * as console from "console";
import {each} from "async";
import {UserService} from "@prisma/client";
import axios from "axios";
import {TwitterUserResult} from "~/types/twitter";
import Logging from "~/lib/logging";

export const start = async (inputs: TrireaOutputs[], userServicesReaction: UserService[]) => {

    const sendMessageInputs = await getInputs(inputs);
    if (!sendMessageInputs.message || !sendMessageInputs.username) {
        Logging.warning('Reaction twitter_send_message fail: No message or username provided');
        return;
    }

    if (userServicesReaction.length === 0 || !userServicesReaction[0].RefreshToken) {
        Logging.warning('Reaction twitter_send_message fail: No user service token provided');
        return;
    }

    const twitterToken = userServicesReaction[0].RefreshToken;
    const targetID = await getUserID(sendMessageInputs.username, twitterToken);

    await sendMessageToUser(sendMessageInputs.message, targetID.username, twitterToken);
};

const sendMessageToUser = async (message: string, userID: string, twitterToken: string): Promise<any> => {
    const dataToSend = JSON.stringify({text: message})

    try {
        const { data } = await axios.post(
            `https://api.twitter.com/2/dm_conversations/with/${userID}/messages`,
            dataToSend,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${twitterToken}`,
                },
            });
        return data;
    } catch (err: any) {
        return
    }
}

const getUserID = async (username: string, twitterToken: string): Promise<TwitterUserResult> => {

    try {
        const {data} = await axios.get<TwitterUserResult>(
            `https://api.twitter.com/2/users/by/username/${username}`,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${twitterToken}`,
                }
            });

        return data;
    } catch (err: any) {
        return err;
    }
}

const getInputs = async (inputs: TrireaOutputs[]): Promise<SendMessageInputs> => {
    let sendMessageInputs : SendMessageInputs = {message: "", username: ""};
    await each(inputs, async (input) => {
        if (input.triggerOutput.name === 'send_message.message' && input.value) {
            sendMessageInputs.message = input.value;
        }
        if (input.triggerOutput.name === 'send_message.username' && input.value) {
            sendMessageInputs.username = input.value;
        }
    });
    return sendMessageInputs;
}

type TwitterUserResult = {
    id: string;
    name: string;
    username: string;
}

type SendMessageInputs = {
    message: string;
    username: string;
}