import React, { Component } from 'react';
import { Button, Col, Container, Form, FormControl, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { playlistMap, songMap, userMap } from "../../common/data";
import { secondsToMinutesString } from "../../common/utils";
import { SongRequest } from "../../common/types";
import "./style.css";
import { ChangeEvent } from 'react';
import { Playlist } from '../../common/types';

interface RequestsTableProps {
    requests: SongRequest[];
    adminPermissions: boolean;
    handleAcceptRequest: (songId: string, requestId: string) => () => void;
    removeVote: (requestId: string) => () => void;
    addVote: (requestId: string) => () => void;
    loggedInUsername?: string;
    toggleLoginModal: (callback?: () => void) => () => void;
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
                                <td>
                                    {this.props.adminPermissions ? <Button variant="primary"
                                                                           onClick={this.props.handleAcceptRequest(request.song.id, request.id)}>Accept
                                            Request</Button> :
                                        (this.props.loggedInUsername !== undefined && request.usersVoted.includes(this.props.loggedInUsername) ?
                                            <Button variant="outline-secondary" onClick={this.props.removeVote(request.id)}>
                                                Remove Vote for Request
                                            </Button> :
                                            <Button variant="outline-secondary"
                                                    onClick={this.props.loggedInUsername === undefined ? this.props.toggleLoginModal(this.props.addVote(request.id)) : this.props.addVote(request.id) }
                                            >
                                                Vote for Request
                                            </Button>)
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
    location: {
        state?: LocationState;
    },
    loggedInUsername?: string;
    toggleLoginModal: (callback?: () => void) => () => void;
    history: any; // todo fix this
}

interface State {
    showAddSong: boolean;
    showRemoveSong: boolean;
    addSearchQuery: string;
    selectedAddSongId: string;
    addSearchFocused: boolean;
    removeSongIds: string[];
}

interface LocationState {
    showAddSong?: boolean;
    showRemoveSong?: boolean;
}

const REMOVE_REQUEST_TH_LABELS = {
    "#": 1,
    "Title": 2,
    "Artist": 2,
    "Album": 2,
    "Date Added": 2,
    "Duration": 1,
    "Actions": 2
}

export default class RequestsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showAddSong: (this.props.location.state !== undefined) && (this.props.location.state.showAddSong === true),
            showRemoveSong: (this.props.location.state !== undefined) && (this.props.location.state.showRemoveSong === true),
            addSearchQuery: "",
            selectedAddSongId: "",
            addSearchFocused: false,
            removeSongIds: []
        }
        this.toggleAddSong = this.toggleAddSong.bind(this);
        this.toggleRemoveSong = this.toggleRemoveSong.bind(this);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
        this.handleAcceptAddRequest = this.handleAcceptAddRequest.bind(this);
        this.handleAcceptRemoveRequest = this.handleAcceptRemoveRequest.bind(this);
        this.removeVote = this.removeVote.bind(this);
        this.addVote = this.addVote.bind(this);
    }

    toggleAddSong() {
        this.setState(prevState => ({ addSearchQuery: "", addSearchFocused: false, selectedAddSongId: "", showAddSong: !prevState.showAddSong }));
    }

    toggleRemoveSong() {
        this.setState(prevState => ({ removeSongIds: [], showRemoveSong: !prevState.showRemoveSong }));
    }

    removeVote(isAddRequest: boolean) {
        return (requestId: string) => () => {
            if (this.props.loggedInUsername !== undefined) {
                let requestList;
                if (isAddRequest) {
                    requestList = playlistMap[this.props.match.params.playlistId].addRequests;
                } else {
                    requestList = playlistMap[this.props.match.params.playlistId].removeRequests;
                }
                const request = requestList.find(request => request.id === requestId);
                if (request !== undefined) {
                    request.usersVoted = request.usersVoted.filter(user => user !== "hci2021");
                    this.forceUpdate();
                }
            }
        };
    }

    addVote(isAddRequest: boolean) {
        return (requestId: string) => () => {
            if (this.props.loggedInUsername !== undefined) {
                let requestList;
                if (isAddRequest) {
                    requestList = playlistMap[this.props.match.params.playlistId].addRequests;
                } else {
                    requestList = playlistMap[this.props.match.params.playlistId].removeRequests;
                }
                const request = requestList.find(request => request.id === requestId);
                if (request !== undefined && !request.usersVoted.includes("hci2021")) {
                    request.usersVoted.push("hci2021");
                    this.forceUpdate();
                }
            }
        }
    }

    updateSearchQuery(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            addSearchQuery: event.target.value
        });
    }

    handleAcceptAddRequest(songId: string, requestId: string) {
        return () => {
            let playlist: Playlist = playlistMap[this.props.match.params.playlistId];
            playlist.addRequests = playlist.addRequests.filter((request) => request.id !== requestId);
            playlist.songIds = playlist.songIds.concat(songId);

            playlistMap[this.props.match.params.playlistId] = playlist;
            this.forceUpdate();
        }
    }

    handleAcceptRemoveRequest(songId: string, requestId: string) {
        return () => {
            let playlist: Playlist = playlistMap[this.props.match.params.playlistId];
            playlist.addRequests = playlist.addRequests.filter((request) => request.id !== requestId);
            playlist.songIds = playlist.songIds.filter((id) => id !== songId);

            playlistMap[this.props.match.params.playlistId] = playlist;
            this.forceUpdate();
        }
    }

    render() {
        const playlist = playlistMap[this.props.match.params.playlistId];
        const creator = userMap[playlist.creator];
        const songs = playlist.songIds.map(id => songMap[id]);

        // replace instead of push because you can't push the same path
        const addRequestCallback = () => this.props.history.replace({
            state: {showAddSong: true}
        });

        const removeRequestCallback = () => this.props.history.replace({
            state: {showRemoveSong: true}
        });

        const finishRequestingSongRemovals = () => {
            this.state.removeSongIds.forEach(element => {
                // todo fix s1234 repeated key
                playlistMap[playlist.id].removeRequests.push({id: `r${playlistMap[playlist.id].removeRequests.length + 1}`, song: songMap[element], usersVoted: ["hci2021"]});
            });
            this.setState({addSearchQuery: "", addSearchFocused: false, removeSongIds: [], showAddSong: false});
            this.toggleRemoveSong();
        };

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
                        {creator.username !== this.props.loggedInUsername && (
                            <div>
                                <Button variant="outline-primary" className="museo-300 mb-2"
                                        onClick={this.props.loggedInUsername === undefined ? this.props.toggleLoginModal(addRequestCallback) : this.toggleAddSong}>
                                    Request to add a song
                                </Button>
                                <br />
                                <Button variant="outline-danger" className="museo-300 mb-2"
                                        onClick={this.props.loggedInUsername === undefined ? this.props.toggleLoginModal(removeRequestCallback) : this.toggleRemoveSong}>
                                    Request to remove a song
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <h2 className="museo-display-light">Add Song Requests</h2>
                        <RequestsTable handleAcceptRequest={this.handleAcceptAddRequest}
                                       adminPermissions={creator.username === this.props.loggedInUsername}
                                       requests={playlist.addRequests}
                                       removeVote={this.removeVote(true)}
                                       addVote={this.addVote(true)}
                                       loggedInUsername={this.props.loggedInUsername}
                                       toggleLoginModal={this.props.toggleLoginModal}
                        />
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <h2 className="museo-display-light">Remove Song Requests</h2>
                        <RequestsTable handleAcceptRequest={this.handleAcceptRemoveRequest}
                                       adminPermissions={creator.username === this.props.loggedInUsername}
                                       requests={playlist.removeRequests}
                                       removeVote={this.removeVote(false)}
                                       addVote={this.addVote(false)}
                                       loggedInUsername={this.props.loggedInUsername}
                                       toggleLoginModal={this.props.toggleLoginModal}
                        />
                    </Col>
                </Row>

                <Modal show={this.state.showAddSong} animation={false} dialogClassName="larger-width-modal museo-300" backdrop="static">
                    <Modal.Header>
                        <Modal.Title className="museo-display-black">Request to add a song</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-3">
                        <Form
                            onFocus={() => this.setState({ addSearchFocused: true })}
                        >
                            <FormControl
                                autoFocus
                                className="my-2 w-auto"
                                placeholder="Type the song title here..."
                                value={this.state.addSearchQuery}
                                onChange={this.updateSearchQuery}
                            />
                            {
                                (this.state.addSearchQuery && (!this.state.selectedAddSongId || this.state.addSearchFocused)) ?
                                    (
                                        <Table className="mx-3 w-auto">
                                            <thead>
                                                <tr>
                                                    <th>Song</th>
                                                    <th>Artist</th>
                                                    <th>Album</th>
                                                    <th>Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Array.from(Object.entries(songMap))
                                                        .filter(([_, song]) =>
                                                            song.title.toLowerCase().includes(this.state.addSearchQuery.toLowerCase()))
                                                        .map(([_, song]) => (
                                                            <tr className="dropdown-item"
                                                                role="button"
                                                                style={{ display: "table-row" }}
                                                                onClick={() => this.setState({ selectedAddSongId: song.id, addSearchFocused: false })}
                                                                key={song.id}
                                                            >
                                                                <td>{song.title}</td>
                                                                <td>{song.artist}</td>
                                                                <td>{song.album}</td>
                                                                <td>{secondsToMinutesString(song.duration)}</td>
                                                            </tr>
                                                        ))
                                                }
                                            </tbody>
                                        </Table>
                                    )
                                    : ""
                            }
                            {
                                this.state.selectedAddSongId ? songMap[this.state.selectedAddSongId].title : ""
                            }
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "flex-end" }}>
                        <Button variant="outline-secondary" onClick={this.toggleAddSong}>
                            Cancel and Close
                        </Button>
                        {
                            this.state.selectedAddSongId ? (
                                <Button variant="primary" onClick={() => {
                                    playlistMap[playlist.id].addRequests.push({id: `r${playlistMap[playlist.id].addRequests.length + 1}`, song: songMap[this.state.selectedAddSongId], usersVoted: ["hci2021"]});
                                    this.setState({addSearchQuery: "", addSearchFocused: false, selectedAddSongId: "", showAddSong: false});
                                }}>
                                    Request this song
                                </Button>
                            ) : ""
                        }
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showRemoveSong} animation={false} dialogClassName="larger-width-modal museo-300" backdrop="static">
                    <Modal.Header>
                        <Modal.Title className="museo-display-black">Request to remove a song</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    {
                                        Array.from(Object.entries(REMOVE_REQUEST_TH_LABELS)).map(([label, colWidth]) =>
                                            <th key={label} className={"customHeader-" + colWidth}>{label}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.from(songs.entries()).map(([i, song]) => (
                                        this.state.removeSongIds.includes(song.id) ? (
                                            <tr key={song.id}>
                                                <td colSpan={Object.keys(REMOVE_REQUEST_TH_LABELS).length}>
                                                    You requested to remove {song.title}.&nbsp;
                                                <Button
                                                        variant="outline-secondary"
                                                        onClick={() => this.setState(prevState => ({ removeSongIds: prevState.removeSongIds.filter(id => id !== song.id) }))}
                                                    >
                                                        Undo
                                                </Button>
                                                </td>
                                            </tr>
                                        ) : (
                                                <tr key={song.id}>
                                                    <td>{i + 1}</td>
                                                    <td>{song.title}</td>
                                                    <td>{song.artist}</td>
                                                    <td>{song.album}</td>
                                                    <td>2021-03-30</td>
                                                    <td>{secondsToMinutesString(song.duration)}</td>
                                                    <td><Button variant="outline-danger" onClick={() => this.setState(prevState => {
                                                        if (!prevState.removeSongIds.includes(song.id)) {
                                                            return { removeSongIds: prevState.removeSongIds.concat(song.id) };
                                                        }
                                                        return { removeSongIds: prevState.removeSongIds };
                                                    })}>Request to remove</Button></td>
                                                </tr>
                                            )
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "flex-end" }}>
                        <Button variant="primary" onClick={finishRequestingSongRemovals}>
                            Finish requesting song removals
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}