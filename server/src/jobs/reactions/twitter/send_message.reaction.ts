import {TrireaInputs, TrireaOutputs} from "~/jobs/handler.job";
import * as console from "console";
import {each} from "async";
import {UserService} from "@prisma/client";
import axios from "axios";
import {TwitterUserResult} from "~/types/twitter";
import Logging from "~/lib/logging";

export const start = async (inputs: TrireaOutputs[], userServicesReaction: UserService[]) => {
    try {
    const sendMessageInputs = await getInputs(inputs);
    const twitterToken = userServicesReaction[0].RefreshToken;
    console.log(twitterToken)
    const targetID = '1222243064825204742';

    const dataToSend = JSON.stringify({text: sendMessageInputs.message})

        const { data } = await axios.post(
            `https://api.twitter.com/2/dm_conversations/with/${targetID}/messages`,
            dataToSend,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${twitterToken}`,
                },
            }
        );


        return data.data;
    } catch (err: any) {
        Logging.error('Failed to get Twitter User' + err);
        throw new Error(err);
    }
};

const getInputs = async (inputs: TrireaOutputs[]): Promise<SendMessageInputs> => {
    let sendMessageInputs : SendMessageInputs = {message: ""};
    await each(inputs, async (input) => {
        if (input.triggerOutput.name === 'send_message.message' && input.value) {
            sendMessageInputs.message = input.value;
        }
    });
    return sendMessageInputs;
}

type SendMessageInputs = {
    message: string;
}