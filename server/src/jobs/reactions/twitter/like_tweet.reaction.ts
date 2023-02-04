import {TrireaOutputs} from "~/jobs/handler.job";
import {each} from "async";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaOutputs[], userServicesReaction: UserService[]) => {

    const likeTweetInputs = await getInputs(inputs);
    if (!likeTweetInputs.id) {
        Logging.warning('Reaction like_tweet fail: No id tweet provided');
        return;
    }

    if (userServicesReaction.length === 0 || !userServicesReaction[0].RefreshToken) {
        Logging.warning('Reaction like_tweet fail: No user service token provided');
        return;
    }

    const twitterToken = userServicesReaction[0].RefreshToken;
    const userID = await getUserID(twitterToken)
    if (!userID) {
        Logging.warning('Reaction like_tweet fail: No userID found');
    }
    Logging.info('Reaction like_tweet: ' + likeTweetInputs.id + ' liked by ' + userID + 'with token ' + twitterToken);
    await likeTweet(likeTweetInputs.id, userID, twitterToken);
};

const likeTweet = async (tweetID: string, userID: string, twitterToken: string): Promise<any> => {
    const dataToSend = JSON.stringify({tweet_id: tweetID})

    try {
        const { data } = await axios.post(
            `https://api.twitter.com/2/users/${userID}/likes`,
            dataToSend,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${twitterToken}`,
                },
            });
        console.log(data);
        return data.data;
    } catch (err: any) {
        Logging.warning('Reaction like_tweet fail: fail to like tweet to target' + err);
        return
    }
}

const getUserID = async (twitterToken: string): Promise<string> => {
    try {
        const { data } = await axios.get<twitterUser>(
            `https://api.twitter.com/2/users/me`,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${twitterToken}`,
                }
            });
        return data.data.id;
    } catch (err: any) {
        Logging.warning('Reaction like_tweet fail: fail to get user id' + err);
        return ""
    }
}

const getInputs = async (inputs: TrireaOutputs[]): Promise<LikeTweetInputs> => {
    const sendMessageInputs : LikeTweetInputs = {id: ""};
    await each(inputs, async (input) => {
        if (input.reactionInputType.name === 'like_tweet.tweet' && input.value) {
            sendMessageInputs.id = input.value;
        }
    });
    return sendMessageInputs;
}

type LikeTweetInputs = {
    id: string;
}

type twitterUser = {
    data: {
        id: string;
        name: string;
        username: string;
    }
}