import {saveTriggerData, transmitOutput, TrireaInputs} from "~/jobs/handler.job";
import {UserService} from "@prisma/client";
import Logging from "~/lib/logging";
import axios from "axios";

export const start = async (trireaId: number, inputs: TrireaInputs[], userServicesTrigger: UserService[], prevTriggerData: string | null): Promise<boolean> => {
    Logging.info('Trigger new playlist start');
    if (userServicesTrigger.length === 0 || !userServicesTrigger[0].RefreshToken) {
        Logging.warning('Trigger new playlist fail: No user service token provided');
        return false;
    }

    const spotifyToken = userServicesTrigger[0].RefreshToken;
    const playlists = await getCurrentUserPlaylist(spotifyToken)
    if (!playlists) {
        Logging.warning('Trigger new playlist fail: fail to fetch commit');
        return false;
    }

    if (playlists.total === -1) {
        return false;
    }

    if (!prevTriggerData) {
        await saveTriggerData(trireaId, playlists.total.toString());
        return false;
    }

    if (prevTriggerData !== playlists.total.toString()) {
        await saveTriggerData(trireaId, playlists.total.toString())
        await transmitOutput(trireaId, playlists.new_playlist_id, 'new_playlist.playlist_id')
        return true
    }

    return false;
};

const getCurrentUserPlaylist = async (spotifyToken: string): Promise<CountPlaylist> => {
    try {
        const {data} = await axios.get<any>(
            `https://api.spotify.com/v1/me/playlists`,
            {
                headers: {
                    Authorization: `Bearer ${spotifyToken}`,
                },
            });
        return {new_playlist_id: data.items[0].id, total: data.total};
    } catch (err: any) {
        Logging.error('Trigger new playlist fail: fetch playlist' + err)
        return {new_playlist_id: '', total: -1};
    }
}

type CountPlaylist = {
    new_playlist_id: string,
    total: number;
}