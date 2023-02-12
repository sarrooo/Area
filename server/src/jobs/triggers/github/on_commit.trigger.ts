import {TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import {each} from "async";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    const newTweetFromInputs = await getInputs(inputs);

    if (!newTweetFromInputs.repository) {
        Logging.warning('Trigger warning: No repository provided');
        return false;
    }
    return false;
};

const getInputs = async (inputs: TrireaInputs[]): Promise<OnCommitInputs> => {
    const newTweetFromInputs : OnCommitInputs = {repository: ""};
    await each(inputs, async (input) => {
        if (input.triggerInputType.name === 'on_commit.repository' && input.value) {
            newTweetFromInputs.repository = input.value;
        }
    });
    return newTweetFromInputs;
}

type OnCommitInputs = {
    repository: string;
}