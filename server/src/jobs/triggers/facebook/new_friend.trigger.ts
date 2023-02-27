import {saveTriggerData, TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    if (userServicesTrigger.length === 0 || !userServicesTrigger[0].RefreshToken) {
        Logging.warning('new_friend trigger: No user service token provided');
        return false;
    }
    const facebookToken = userServicesTrigger[0].RefreshToken;
    const data = await getNewFriend(facebookToken);
    if (!data || isNaN(data.summary.total_count)) {
        Logging.warning('new_friend trigger fail: fail to fetch new friends');
        return false;
    }
    if (!prevTriggerData) {
        await saveTriggerData(trireaId, data.summary.total_count.toString());
        return false;
    }

    if (prevTriggerData < data.summary.total_count.toString()) {
        await saveTriggerData(trireaId, data.summary.total_count.toString());
        return true
    } else {
        await saveTriggerData(trireaId, data.summary.total_count.toString());
    }
    return false;
};

const getNewFriend = async (facebookToken: string): Promise<NewFriendFacebook> => {
    try {
        const { data } = await axios.get<NewFriendFacebook>(
            `https://graph.facebook.com/v16.0/me/friends`,
            {
                headers: {
                    Authorization: `Bearer ${facebookToken}`,
                },
            });
        return data;
    } catch (err: any) {
        Logging.warning('new friend trigger fail: fail to fetch new friend');
        return {summary: {total_count: NaN}};
    }
}

type NewFriendFacebook = {
    summary: {
        total_count: number,
    }
}

