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
        admins: ["aaron1200", "joeiscool", "michelle1721"],
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
    },
    joeiscool: {
        username: "joeiscool",
        displayName: "Joe Adams",
        profilePictureURL: "/album.jpg",
        playlistIds: [],
        followers: 39,
        following: 13
    },
    michelle1721: {
        username: "michelle1721",
        displayName: "Michelle Thompson",
        profilePictureURL: "/album.jpg",
        playlistIds: [],
        followers: 1203,
        following: 101
    },
    noah2111: {
        username: "noah2111",
        displayName: "Noah Smith",
        profilePictureURL: "/album.jpg",
        playlistIds: [],
        followers: 12,
        following: 11
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
