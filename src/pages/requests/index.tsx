import React, {Component} from 'react';
import {Button, Col, Container, Form, FormControl, Modal, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {playlistMap, songMap, userMap} from "../../common/data";
import {secondsToMinutesString} from "../../common/utils";
import {SongRequest} from "../../common/types";
import "./style.css";
import { ChangeEvent } from 'react';
import { Dropdown } from 'react-bootstrap';

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
                            <td>2021-03-30</td>
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

interface State {
    showHide: boolean;
    searchQuery: string;
}

export default class RequestsPage extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            showHide: false,
            searchQuery: ""
        }
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
    }

    handleModalShowHide() {
        this.setState(prevState => this.setState({ showHide: !prevState.showHide }));
    }

    updateSearchQuery(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchQuery: event.target.value
        });
    }

    render() {
        const playlist = playlistMap[this.props.match.params.playlistId];
        const creator = userMap[playlist.creator];
        return (
            <Container>
                <Row className="my-4">
                    <Col xs={8}>
                        <Link to={`/playlist/${playlist.id}`}>&#8592; Go back to playlist</Link><br />
                        <h1>Song Requests</h1>
                        Playlist: <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link> by <Link to={`/user/${creator.username}`}>{creator.displayName}</Link>
                    </Col>
                    <Col xs={4}>
                        <Button className="museo-300 mb-2" onClick={this.handleModalShowHide}>Request to add a song</Button><br />
                        <Link to={`/playlist/${playlist.id}/requests`}>
                            <Button className="museo-300 mb-2">Request to remove a song</Button><br />
                        </Link>
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

                <Modal show={this.state.showHide} animation={false}>
                    <Modal.Header onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Request to add a song</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormControl
                                autoFocus
                                className="mx-3 my-2 w-auto"
                                placeholder="Type to filter..."
                                value={this.state.searchQuery}
                                onChange={this.updateSearchQuery}
                            />
                            <ul className="list-unstyled">
                                {
                                    this.state.searchQuery ?
                                        Array.from(Object.entries(songMap))
                                            .filter(([_, song]) => song.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                                            .map(([_, song]) => <Dropdown.Item>{song.title}</Dropdown.Item>)
                                        : ""
                                }
                            </ul>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "flex-start"}}>
                        <Button variant="secondary" onClick={() => {this.handleModalShowHide(); this.setState({searchQuery: ""})}}>
                            Close this window
                        </Button>
                        {
                            this.state.searchQuery ? (
                                <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                                    Save Changes
                                </Button>
                            ) : ""
                        }
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}