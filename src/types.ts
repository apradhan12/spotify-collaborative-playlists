export interface User {
    username: string; // unique
    displayName: string;
    profilePictureURL: string;
    playlists: Playlist[];
    followers: number;
    following: number;
}

export interface Playlist {
    id: string;
    title: string;
    pictureURL: string;
    description: string;
    songs: Song[];
    admins: User[];
    requests: SongRequest[];
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
    userRequested: User;
    add: boolean;
    songs: Song[];
    usersVoted: User[];
}
