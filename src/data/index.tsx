import {Playlist, Song, User} from "../common/types";

export interface PlaylistMap {
    [key: string]: Playlist;
}

export const playlistMap: PlaylistMap = {
    abc: {
        id: "abc",
        title: "60s/70s Rock",
        pictureURL: "/album.jpg",
        description: "Best rock songs of the 1960s and 1970s",
        songIds: ["123", "456"],
        creator: "aaron1200",
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
        playlistIds: ["abc"],
        followers: 20,
        following: 31
    }
}

interface SongMap {
    [key: string]: Song;
}

export const songMap: SongMap = {
    "123": {
        id: "123",
        title: "(Don't Fear) The Reaper",
        artist: "Blue Öyster Cult",
        album: "Agents of Fortune",
        duration: 308
    },
    "456": {
        id: "456",
        title: "Don't Stop Me Now",
        artist: "Queen",
        album: "Jazz",
        duration: 209
    }
}
