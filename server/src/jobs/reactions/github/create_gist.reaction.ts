import {TrireaOutputs} from "~/jobs/handler.job";
import {each} from "async";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaOutputs[], userServicesReaction: UserService[]) => {

    const createGistInputs = await getInputs(inputs);
    if (!createGistInputs.description) {
        Logging.warning('Reaction create_gist fail: No description provided');
        return;
    }
    if (!createGistInputs.content) {
        Logging.warning('Reaction create_gist fail: No content provided');
        return;
    }

    if (userServicesReaction.length === 0 || !userServicesReaction[0].RefreshToken) {
        Logging.warning('Reaction create_gist fail: No user service token provided');
        return;
    }

    const githubToken = userServicesReaction[0].RefreshToken;
};

const getInputs = async (inputs: TrireaOutputs[]): Promise<CreateGistInputs> => {
    const createGistInputs : CreateGistInputs = {description: '', content: '', public: false};
    await each(inputs, async (input) => {
        if (input.reactionInputType.name === 'create_gist.description' && input.value) {
            createGistInputs.description = input.value;
        }
        if (input.reactionInputType.name === 'create_gist.content' && input.value) {
            createGistInputs.content = input.value;
        }
        if (input.reactionInputType.name === 'create_gist.public' && input.value) {
            createGistInputs.public = (input.value.toLowerCase() === 'true')
        }
    });
    return createGistInputs;
}

type CreateGistInputs = {
    description: string;
    content: string;
    public: boolean;
}

type twitterUser = {
    data: {
        id: string;
        name: string;
        username: string;
    }
}