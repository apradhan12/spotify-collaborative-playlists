import {Playlist} from "../common/types";

export interface PlaylistMap {
    [key: string]: Playlist;
}

export const idMapping: PlaylistMap = {
    abc: {
        id: "abc",
        title: "60s/70s Rock",
        pictureURL: "/album.jpg",
        description: "Best rock songs of the 1960s and 1970s",
        songs: [
            {
                id: "123",
                title: "(Don't Fear) The Reaper",
                artist: "Blue Öyster Cult",
                album: "Agents of Fortune",
                duration: 308
            },
            {
                id: "456",
                title: "Don't Stop Me Now",
                artist: "Queen",
                album: "Jazz",
                duration: 209
            }
        ],
        creator: {
            username: "aaron1200",
            displayName: "Aaron",
            profilePictureURL: "/album.jpg",
            playlists: [],
            followers: 20,
            following: 31
        },
        admins: [],
        requests: []
    }
}
