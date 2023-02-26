import {TrireaOutputs} from "~/jobs/handler.job";
import {each} from "async";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaOutputs[], userServicesReaction: UserService[]) => {

    const sendMailInputs = await getInputs(inputs);
    if (!sendMailInputs.to) {
        Logging.warning('Reaction send mail fail: No to provided');
        return;
    }
    if (!sendMailInputs.subject) {
        Logging.warning('Reaction send mail fail: No subject provided');
        return;
    }
    if (!sendMailInputs.content) {
        Logging.warning('Reaction send mail fail: No content provided');
        return;
    }

    if (userServicesReaction.length === 0 || !userServicesReaction[0].RefreshToken) {
        Logging.warning('Reaction send mail fail: No user service token provided');
        return;
    }

    const googleToken = userServicesReaction[0].RefreshToken;
    await sendMail('me', sendMailInputs.to, sendMailInputs.subject, sendMailInputs.content, googleToken);
};

const sendMail = async (from:string, to: string, subject: string, content: string, googleToken: string): Promise<any> => {
    const dataToSend = "From: " + from + "\n" +
        "To: " + to + "\n" +
        "Subject: "  + subject + "\n" +
        "\n" + content;

    try {
        const { data } = await axios.post(
            `https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send`,
            dataToSend,
            {
                headers: {
                    "Content-type": "message/rfc822",
                    Authorization: `Bearer ${googleToken}`,
                },
            });
        return data;
    } catch (err: any) {
        Logging.warning('Reaction send mail fail: fail to send ' + dataToSend);
        return
    }
}

const getInputs = async (inputs: TrireaOutputs[]): Promise<SendMailsInputs> => {
    const sendMailsInputs : SendMailsInputs = {to: '', subject: '', content: ''};
    await each(inputs, async (input) => {
        if (input.reactionInputType.name === 'send_mail.to' && input.value) {
            sendMailsInputs.to = input.value;
        }
        if (input.reactionInputType.name === 'send_mail.subject' && input.value) {
            sendMailsInputs.subject = input.value;
        }
        if (input.reactionInputType.name === 'send_mail.content' && input.value) {
            sendMailsInputs.content = input.value;
        }
    });
    return sendMailsInputs;
}

type SendMailsInputs = {
    to: string;
    subject: string;
    content: string;
}