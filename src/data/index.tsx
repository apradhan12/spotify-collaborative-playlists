import {Playlist, User} from "../common/types";

export interface PlaylistMap {
    [key: string]: Playlist;
}

export const playlistMap: PlaylistMap = {
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
            displayName: "Aaron Pradhan",
            profilePictureURL: "/album.jpg",
            playlists: [],
            followers: 20,
            following: 31
        },
        admins: [],
        requests: []
    }
}

interface UserMap {
    [key: string]: User;
}

export const userMap: UserMap = {
    aaron1200: {
        username: "aaron1200",
        displayName: "Aaron Pradhan",
        profilePictureURL: "/album.jpg",
        playlists: [playlistMap.abc],
        followers: 20,
        following: 31
    },
    cooljoe24: {
        username: "cooljoe24",
        displayName: "Joe Biden",
        profilePictureURL: "/album.jpg",
        playlists: [],
        followers: 54000,
        following: 1200
    },
    michelle1721: {
        username: "michelle1721",
        displayName: "Michelle Christiansen",
        profilePictureURL: "/album.jpg",
        playlists: [],
        followers: 235,
        following: 67
    },
    sam230: {
        username: "sam230",
        displayName: "Sam Johnson",
        profilePictureURL: "/album.jpg",
        playlists: [],
        followers: 10,
        following: 21
    }
}
