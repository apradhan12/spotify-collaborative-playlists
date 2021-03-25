import {Component} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Playlist} from "../../common/types";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
}

interface PlaylistMap {
    [key: string]: Playlist;
}

const idMapping: PlaylistMap = {
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

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;

function secondsToMinutesString(seconds: number) {
    return `${Math.floor(seconds / SECONDS_PER_MINUTE)}:${(seconds % SECONDS_PER_MINUTE).toString().padStart(2, "0")}`;
}

function secondsToHoursString(seconds: number) {
    return `${Math.floor(seconds / (SECONDS_PER_MINUTE * MINUTES_PER_HOUR))} hr ${(Math.floor(seconds % (SECONDS_PER_MINUTE * MINUTES_PER_HOUR) / SECONDS_PER_MINUTE))} min`;
}

function sum(nums: number[]) {
    return nums.reduce((a, b) => a + b, 0)
}

export default class RequestsPage extends Component<Props> {
    render() {
        const playlist = idMapping[this.props.match.params.playlistId];
        return (
            <Container>
                <Row>
                    <img src={process.env.PUBLIC_URL + playlist.pictureURL} alt="Album cover" width="200" height="200"/>
                    <Col>
                        Playlist<br/>
                        <h1>{playlist.title}</h1>
                        Created by {playlist.creator.displayName} &bull; {playlist.songs.length} songs, {secondsToHoursString(sum(playlist.songs.map(song => song.duration)))}<br/>
                        <Button>Share</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th>Date Added</th>
                                <th>Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                Array.from(playlist.songs.entries()).map(([i, song]) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{song.title}</td>
                                        <td>{song.artist}</td>
                                        <td>{song.album}</td>
                                        <td>never</td>
                                        <td>{secondsToMinutesString(song.duration)}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}
