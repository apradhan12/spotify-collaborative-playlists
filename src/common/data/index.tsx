import {Playlist, Song, User} from "../types";

export interface PlaylistMap {
    [key: string]: Playlist;
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
    },
    "s1": {
        id: "s1",
        title: "Get Back",
        artist: "The Beatles",
        album: "Let It Be",
        duration: 187
    },
    "s2": {
        id: "s2",
        title: "Revolution",
        artist: "The Beatles",
        album: "The Beatles 1967 - 1970",
        duration: 205
    }
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
        addRequests: [
            {
                id: "r1",
                song: songMap["s1"],
                usersVoted: ["jack1298", "carol1522", "hd123", "bigdolphin"]
            },
            {
                id: "r2",
                song: songMap["s2"],
                usersVoted: ["jack1298", "carol1522", "hd123"]
            }
        ],
        removeRequests: [
            {
                id: "r1",
                song: songMap["456"],
                usersVoted: ["jack1298", "carol1522", "hd123"]
            }
        ]
    }
}