import {Component} from 'react';
import {Button, Col, Container, Row, Table, Image} from "react-bootstrap";
import {playlistMap, songMap, userMap} from "../../common/data";
import {secondsToHoursString, secondsToMinutesString, sum} from "../../common/utils";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
}

export default class PlaylistPage extends Component<Props> {
    render() {
        const playlist = playlistMap[this.props.match.params.playlistId];
        const creator = userMap[playlist.creator];
        const songs = playlist.songIds.map(id => songMap[id]);
        return (
            <Container>
                <Row className="my-4">
                    <Col xs={4}>
                        <Image src={process.env.PUBLIC_URL + playlist.pictureURL} alt="Album cover" fluid/>
                    </Col>
                    <Col xs={8}>
                        <p className="museo-display-light m-0">Playlist</p>

                        <h1 className="museo-display-black">{playlist.title}</h1>
                        <p className="museo-300">Created by {creator.displayName} &bull; {songs.length} songs, {secondsToHoursString(sum(songs.map(song => song.duration)))}</p>
                        <Button className="museo-300">Share</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover className="museo-300">
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
