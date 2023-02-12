import {TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import {each} from "async";
import Logging from "~/lib/logging";
import axios from "axios";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    const newTweetFromInputs = await getInputs(inputs);

    if (!newTweetFromInputs.repository) {
        Logging.warning('Trigger on commit fail: No repository provided');
        return false;
    }

    if (userServicesTrigger.length === 0 || !userServicesTrigger[0].RefreshToken) {
        Logging.warning('Trigger on commit fail: No user service token provided');
        return false;
    }

    return false;
};

const getCommitFromARepository = async (repository: string, owner: string, githubToken: string): Promise<any> => {
    try {
        const {data} = await axios.get<any>(
            `https://api.github.com/repos/${owner}/${repository}/commits`,
            {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                },
            });
        return data;
    } catch (err: any) {
        Logging.warning('Trigger on commit fail: fail to fetch commit');
        return false;
    }
}

const getInputs = async (inputs: TrireaInputs[]): Promise<OnCommitInputs> => {
    const newTweetFromInputs : OnCommitInputs = {owner:"", repository: ""};
    await each(inputs, async (input) => {
        if (input.triggerInputType.name === 'on_commit.owner' && input.value) {
            newTweetFromInputs.owner = input.value;
        }
        if (input.triggerInputType.name === 'on_commit.repository' && input.value) {
            newTweetFromInputs.repository = input.value;
        }
    });
    return newTweetFromInputs;
}

type OnCommitInputs = {
    owner: string;
    repository: string;
}