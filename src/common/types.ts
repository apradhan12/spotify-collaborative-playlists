export interface User {
    username: string; // unique
    displayName: string;
    profilePictureURL: string;
    playlistIds: string[];
    followers: number;
    following: number;
}

export interface Playlist {
    id: string;
    title: string;
    pictureURL: string;
    description: string;
    songIds: string[];
    creator: string; // username
    admins: string[]; // usernames
    addRequests: SongRequest[];
    removeRequests: SongRequest[];
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
}

export interface SongRequest {
    id: string;
    song: Song;
    usersVoted: string[]; // array of usernames
}
