import {Component} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {playlistMap, songMap, userMap} from "../../data";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
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

export default class PlaylistPage extends Component<Props> {
    render() {
        const playlist = playlistMap[this.props.match.params.playlistId];
        const creator = userMap[playlist.creator];
        const songs = playlist.songIds.map(id => songMap[id]);
        return (
            <Container>
                <Row>
                    <img src={process.env.PUBLIC_URL + playlist.pictureURL} alt="Album cover" width="200" height="200"/>
                    <Col>
                        Playlist<br/>
                        <h1>{playlist.title}</h1>
                        Created by {creator.displayName} &bull; {songs.length} songs, {secondsToHoursString(sum(songs.map(song => song.duration)))}<br/>
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
                                Array.from(songs.entries()).map(([i, song]) => (
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
