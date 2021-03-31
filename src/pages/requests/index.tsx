import React, {Component} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {playlistMap, userMap} from "../../common/data";
import {secondsToMinutesString} from "../../common/utils";
import {SongRequest} from "../../common/types";
import "./style.css";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
}

interface RequestsTableProps {
    requests: SongRequest[];
}

class RequestsTable extends Component<RequestsTableProps> {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th className="customHeader-1">#</th>
                    <th className="customHeader-2">Title</th>
                    <th className="customHeader-2">Artist</th>
                    <th className="customHeader-2">Album</th>
                    <th className="customHeader-1">Date Added</th>
                    <th className="customHeader-1">Duration</th>
                    <th className="customHeader-1">Votes</th>
                    <th className="customHeader-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    Array.from(this.props.requests.entries()).map(([i, request]) => (
                        <tr key={request.id}>
                            <td>{i + 1}</td>
                            <td>{request.song.title}</td>
                            <td>{request.song.artist}</td>
                            <td>{request.song.album}</td>
                            <td>never</td>
                            <td>{secondsToMinutesString(request.song.duration)}</td>
                            <td>{request.usersVoted.length}</td>
                            <td><Button>Vote for request</Button></td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        );
    }
}

export default class RequestsPage extends Component<Props> {
    render() {
        const playlist = playlistMap[this.props.match.params.playlistId];
        const creator = userMap[playlist.creator];
        return (
            <Container>
                <Row>
                    <Col>
                        <Link to={`/playlist/${playlist.id}`}>&#8592; Go back to playlist</Link><br />
                        <h1>Song Requests</h1>
                        Playlist: <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link> by <Link to={`/user/${creator.username}`}>{creator.displayName}</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Requests to add songs</h2>
                        <RequestsTable requests={playlist.addRequests} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Requests to remove songs</h2>
                        <RequestsTable requests={playlist.removeRequests} />
                    </Col>
                </Row>
            </Container>
        );
    }
}