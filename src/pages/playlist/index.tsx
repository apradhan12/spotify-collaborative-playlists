import React, {Component} from 'react';
import {Button, Col, Container, Row, Table, Image} from "react-bootstrap";
import {playlistMap, songMap, userMap} from "../../common/data";
import {secondsToHoursString, secondsToMinutesString, sum} from "../../common/utils";
import {Link} from "react-router-dom";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    },
    loggedInUsername: string;
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
                    <Col xs={4}>
                        <p className="museo-display-light m-0">Playlist</p>
                        <h1 className="museo-display-black">{playlist.title}</h1>
                        <p className="museo-300">Created by <Link to={`/user/${creator.username}`}>{creator.displayName}</Link> &bull; {songs.length} songs, {secondsToHoursString(sum(songs.map(song => song.duration)))}</p>
                        <Button variant="outline-secondary" className="museo-300">Share</Button>
                    </Col>
                    <Col xs={4} className="text-right">
                        { (creator.username !== this.props.loggedInUsername) && (  
                            <div>
                                <Link to={{
                                    pathname: `/playlist/${playlist.id}/requests`,
                                    state: {showAddSong: true}
                                }}>
                                    <Button variant="outline-primary" className="museo-300 mb-2">Request to add a song</Button><br />
                                </Link>
                                <Link to={{
                                    pathname: `/playlist/${playlist.id}/requests`,
                                    state: {showRemoveSong: true}
                                }}>
                                    <Button variant="outline-danger" className="museo-300 mb-2">Request to remove a song</Button><br />
                                </Link>
                                <Link to={`/playlist/${playlist.id}/requests`}>
                                    <Button variant="outline-secondary" className="museo-300 mb-2">View song requests</Button><br />
                                </Link>
                            </div>
                        )}

                        { (creator.username === this.props.loggedInUsername) && (  
                            <div>
                                <Link to={`/playlist/${playlist.id}/requests`}>
                                    <Button variant="primary" className="museo-300 mb-2">Manage Song Requests</Button><br />
                                </Link>
                                <Link to={`/playlist/${playlist.id}/admins`}>
                                    <Button variant="outline-secondary" className="museo-300 mb-2">Manage Administrators</Button><br />
                                </Link>
                            </div>
                        )}
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
                                    <tr key={song.id}>
                                        <td>{i + 1}</td>
                                        <td>{song.title}</td>
                                        <td>{song.artist}</td>
                                        <td>{song.album}</td>
                                        <td>2021-03-30</td>
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
