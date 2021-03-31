import React, {Component} from 'react';
import {Button, Col, Container, Form, FormControl, Modal, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {playlistMap, songMap, userMap} from "../../common/data";
import {secondsToMinutesString} from "../../common/utils";
import {SongRequest} from "../../common/types";
import "./style.css";
import { ChangeEvent } from 'react';

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
                            <td><Button variant="outline-primary">Vote for request</Button></td>
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
    selectedSongId: string;
    searchFocused: boolean;
}

export default class RequestsPage extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            showHide: false,
            searchQuery: "",
            selectedSongId: "",
            searchFocused: false
        }
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
    }

    handleModalShowHide() {
        this.setState(prevState => ({ showHide: !prevState.showHide }));
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
            <Container className="museo-300">
                <Row className="mt-4">
                    <Col xs={12}>
                        <Link to={`/playlist/${playlist.id}`}>&#8592; Go back to playlist</Link>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs={8}>  
                        <h1 className="museo-display-black">Song Requests</h1>
                        Playlist: <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link> by <Link to={`/user/${creator.username}`}>{creator.displayName}</Link>
                    </Col>
                    <Col xs={4} className="text-right">
                        <Button variant="outline-primary" className="museo-300 mb-2" onClick={this.handleModalShowHide}>Request to add a song</Button><br />
                        <Link to={`/playlist/${playlist.id}/requests`}>
                            <Button variant="outline-danger" className="museo-300 mb-2">Request to remove a song</Button><br />
                        </Link>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <h2 className="museo-display-light">Add Song Requests</h2>
                        <RequestsTable requests={playlist.addRequests} />
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <h2 className="museo-display-light">Remove Song Requests</h2>
                        <RequestsTable requests={playlist.removeRequests} />
                    </Col>
                </Row>

                <Modal show={this.state.showHide} animation={false} dialogClassName="larger-width-modal">
                    <Modal.Header onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Request to add a song</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            onFocus={() => this.setState({searchFocused: true})}
                        >
                            <FormControl
                                autoFocus
                                className="mx-3 my-2 w-auto"
                                placeholder="Type to filter..."
                                value={this.state.searchQuery}
                                onChange={this.updateSearchQuery}
                            />
                            {
                                (this.state.searchQuery && (!this.state.selectedSongId || this.state.searchFocused)) ?
                                    (
                                        <Table className="mx-3 w-auto">
                                            <thead>
                                            <tr>
                                                <th>Song</th>
                                                <th>Artist</th>
                                                <th>Album</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                Array.from(Object.entries(songMap))
                                                    .filter(([_, song]) =>
                                                        song.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                                                    .map(([_, song]) => (
                                                        <tr className="dropdown-item"
                                                            role="button"
                                                            style={{display: "table-row"}}
                                                            onClick={() => {this.setState({selectedSongId: song.id, searchFocused: false}); console.log(song.title)}}
                                                        >
                                                            <td>{song.title}</td>
                                                            <td>{song.artist}</td>
                                                            <td>{song.album}</td>
                                                        </tr>
                                                    ))
                                            }
                                            </tbody>
                                        </Table>
                                    )
                                    : ""
                            }
                            {
                                this.state.selectedSongId ? songMap[this.state.selectedSongId].title : ""
                            }
                            {/*<ul className="list-unstyled">*/}
                            {/*    {*/}
                            {/*        this.state.searchQuery ?*/}
                            {/*            Array.from(Object.entries(songMap))*/}
                            {/*                .filter(([_, song]) => song.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))*/}
                            {/*                .map(([_, song]) => <Dropdown.Item>{song.title}</Dropdown.Item>)*/}
                            {/*            : ""*/}
                            {/*    }*/}
                            {/*</ul>*/}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "flex-start"}}>
                        <Button variant="secondary" onClick={() => {this.setState({searchQuery: "", searchFocused: false, selectedSongId: "", showHide: false})}}>
                            Close this window
                        </Button>
                        {
                            this.state.selectedSongId ? (
                                <Button variant="primary" onClick={() => {
                                    playlistMap[playlist.id].addRequests.push({id: "s1234", song: songMap[this.state.selectedSongId], usersVoted: ["me"]});
                                    this.setState({searchQuery: "", searchFocused: false, selectedSongId: "", showHide: false});
                                }}>
                                    Request this song
                                </Button>
                            ) : ""
                        }
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}