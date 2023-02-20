import {TrireaOutputs} from "~/jobs/handler.job";
import {each} from "async";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaOutputs[], userServicesReaction: UserService[]) => {

    const createIssueCommentInputs = await getInputs(inputs);
    if (!createIssueCommentInputs.owner) {
        Logging.warning('Reaction create_issue_comment fail: No owner provided');
        return;
    }
    if (!createIssueCommentInputs.repository) {
        Logging.warning('Reaction create_issue_comment fail: No repository provided');
        return;
    }
    if (!createIssueCommentInputs.issue) {
        Logging.warning('Reaction create_issue_comment fail: No issue provided');
        return;
    }
    if (!createIssueCommentInputs.comment) {
        Logging.warning('Reaction create_issue_comment fail: No comment provided');
        return;
    }
    if (userServicesReaction.length === 0 || !userServicesReaction[0].RefreshToken) {
        Logging.warning('Reaction create_issue_comment fail: No user service token provided');
        return;
    }

    const githubToken = userServicesReaction[0].RefreshToken;
    await createIssueComment(createIssueCommentInputs.owner, createIssueCommentInputs.repository, createIssueCommentInputs.issue, createIssueCommentInputs.comment, githubToken);
};

const createIssueComment = async (owner: string, repository: string, issue: string, comment: string, githubToken: string): Promise<any> => {
    const dataToSend = JSON.stringify({body: comment})

    try {
        const { data } = await axios.post(
            `https://api.github.com/repos/${owner}/${repository}/issues/${issue}/comments`,
            dataToSend,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${githubToken}`,
                }
            });
        return data.data;
    } catch (err: any) {
        Logging.warning('Reaction create_issue_comment fail: fail to create issue comment ' + err);
        return
    }
}

const getInputs = async (inputs: TrireaOutputs[]): Promise<CreateIssueCommentInputs> => {
    const createGistInputs : CreateIssueCommentInputs = {owner: '', repository: '', issue: '', comment: ''};
    await each(inputs, async (input) => {
        if (input.reactionInputType.name === 'create_issue_comment.owner' && input.value) {
            createGistInputs.owner = input.value;
        }
        if (input.reactionInputType.name === 'create_issue_comment.repository' && input.value) {
            createGistInputs.repository = input.value;
        }
        if (input.reactionInputType.name === 'create_issue_comment.issue' && input.value) {
            createGistInputs.issue = input.value;
        }
        if (input.reactionInputType.name === 'create_issue_comment.comment' && input.value) {
            createGistInputs.comment = input.value;
        }
    });
    return createGistInputs;
}

type CreateIssueCommentInputs = {
    owner: string;
    repository: string;
    issue: string;
    comment: string;
}