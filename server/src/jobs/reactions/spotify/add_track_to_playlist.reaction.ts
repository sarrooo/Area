import {TrireaOutputs} from "~/jobs/handler.job";
import {each} from "async";
import {UserService} from "@prisma/client";
import axios from "axios";
import Logging from "~/lib/logging";
import qs from "qs";

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
    const trackURI = await getTrackURI(addTrackToPlaylistInputs.artist_name, addTrackToPlaylistInputs.track_name, spotifyToken)
    if (!trackURI.uri) {
        Logging.warning('Reaction add_track_to_playlist fail: No trackURI found');
        return;
    }
    await addTrackToPlaylist(addTrackToPlaylistInputs.playlist_id, trackURI.uri, spotifyToken);
};

const addTrackToPlaylist = async (playlist_id: string, trackURI: string, spotifyToken: string): Promise<any> => {
    try {
        const { data } = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${trackURI}`,
        {},
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${spotifyToken}`,
                }
            });
        return data;
    } catch (err: any) {
        Logging.warning('Reaction add_track_to_playlist fail: fail to add track to playlist' + err);
        return
    }
}

const getTrackURI = async (artist_name: string, track_name: string, spotifyToken: string): Promise<TrackURI> => {
    try {
        const options = {
            q: 'artist:' + artist_name + ' track:' + track_name,
            type: 'track',
        };
        const { data } = await axios.get<any>(
            `https://api.spotify.com/v1/search?` + qs.stringify(options),
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${spotifyToken}`,
                }
            });
        return data.items[0].uri;
    } catch (err: any) {
        Logging.warning('Reaction like_tweet fail: fail to get user id' + err);
        return {uri: ''}
    }
}

const getInputs = async (inputs: TrireaOutputs[]): Promise<AddTrackToPlaylistInputs> => {
    const addTrackToPlaylistInputs : AddTrackToPlaylistInputs = {playlist_id: '', artist_name: '', track_name: ''};
    await each(inputs, async (input) => {
        if (input.reactionInputType.name === 'add_track_to_playlist.playlist_id' && input.value) {
            addTrackToPlaylistInputs.playlist_id = input.value;
        }
        if (input.reactionInputType.name === 'add_track_to_playlist.artist_name' && input.value) {
            addTrackToPlaylistInputs.artist_name = input.value;
        }
        if (input.reactionInputType.name === 'add_track_to_playlist.track_name' && input.value) {
            addTrackToPlaylistInputs.track_name = input.value;
        }
    });
    return addTrackToPlaylistInputs;
}

type TrackURI = {
    uri: string;
}

type AddTrackToPlaylistInputs = {
    playlist_id: string;
    artist_name: string;
    track_name: string;
}