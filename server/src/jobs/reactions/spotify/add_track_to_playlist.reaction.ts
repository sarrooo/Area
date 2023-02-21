import {TrireaOutputs} from "~/jobs/handler.job";
import {each} from "async";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";

export const start = async (trireaId: number, inputs: TrireaOutputs[], userServicesReaction: UserService[]) => {

    const addTrackToPlaylistInputs = await getInputs(inputs);
    if (!addTrackToPlaylistInputs.playlist_id) {
        Logging.warning('Reaction add_track_to_playlist fail: No playlist_id provided');
        return;
    }
    if (!addTrackToPlaylistInputs.artist_name) {
        Logging.warning('Reaction add_track_to_playlist fail: No artist_name provided');
        return;
    }
    if (!addTrackToPlaylistInputs.track_name) {
        Logging.warning('Reaction add_track_to_playlist fail: No track_name provided');
        return;
    }

    if (userServicesReaction.length === 0 || !userServicesReaction[0].RefreshToken) {
        Logging.warning('Reaction create_gist fail: No user service token provided');
        return;
    }

    const spotifyToken = userServicesReaction[0].RefreshToken;
};

const getInputs = async (inputs: TrireaOutputs[]): Promise<AddTrackToPlaylistInputs> => {
    const addTrackToPlaylistInputs : AddTrackToPlaylistInputs = {playlist_id: '', artist_name: '', track_name: false};
    await each(inputs, async (input) => {
        if (input.reactionInputType.name === 'add_track_to_playlist.playlist_id' && input.value) {
            addTrackToPlaylistInputs.playlist_id = input.value;
        }
        if (input.reactionInputType.name === 'add_track_to_playlist.artist_name' && input.value) {
            addTrackToPlaylistInputs.artist_name = input.value;
        }
        if (input.reactionInputType.name === 'add_track_to_playlist.track_name' && input.value) {
            addTrackToPlaylistInputs.track_name = (input.value.toLowerCase() === 'true')
        }
    });
    return addTrackToPlaylistInputs;
}

type AddTrackToPlaylistInputs = {
    playlist_id: string;
    artist_name: string;
    track_name: boolean;
}