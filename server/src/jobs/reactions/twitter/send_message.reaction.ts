import {TrireaInputs, TrireaOutputs} from "~/jobs/handler.job";
import * as console from "console";
import {each} from "async";
import {UserService} from "@prisma/client";

export const start = async (inputs: TrireaOutputs[], userServices: UserService[]) => {
    const sendMessageInputs = await getInputs(inputs);
    console.log(sendMessageInputs.message);
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