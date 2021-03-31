import React from 'react'
import { Button, Container, Row, Col, Modal, Form, FormControl, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { playlistMap, userMap } from "../../common/data";
import { ChangeEvent } from 'react';

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
}

interface State {
    showHide: boolean;
    searchQuery: string;
    selectedAdminUsername: string;
    searchFocused: boolean;
}

export default class ManageAdmin extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showHide: false,
            searchQuery: "",
            selectedAdminUsername: "",
            searchFocused: false
        }
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
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
                <Row className="my-4">
                    <Col xs={12}>
                        <Link to={`/playlist/${playlist.id}`}>&#8592; Go back to playlist</Link>
                        <h1 className="museo-display-black">Manage Administrators</h1>
                        <p>Playlist: <Link to={`/playlist/${playlist.id}`}>{playlist.title}</Link> by <Link to={`/user/${creator.username}`}>{creator.displayName}</Link></p>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs={12}>
                        <h3 className="museo-display-light">Current Administrators</h3>
                        {playlist.admins.length > 0 && 
                            <ul>
                                {playlist.admins.map((adminName) => (
                                    <li key={adminName}>
                                        <p className="m-0">{adminName}</p>
                                    </li>
                                ))}
                            </ul>
                        }
                        {!(playlist.admins.length > 0) && <p>There are no admins for this playlist. Add one to help manage requests.</p>}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={12}>
                        <Button variant="primary" onClick={() => this.handleModalShowHide()}>Add new Administrator</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button variant="danger">Remove an Administrator</Button>
                    </Col>
                </Row>

                <Modal show={this.state.showHide} backdrop="static" dialogClassName="museo-300">
                    <Modal.Header onClick={() => this.handleModalShowHide()}>
                        <Modal.Title className="museo-display-black">Add new Administrator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onFocus={() => this.setState({ searchFocused: true })}>
                            <FormControl autoFocus
                                className="mx-3 my-2 w-auto"
                                placeholder="Type a username..."
                                value={this.state.searchQuery}
                                onChange={this.updateSearchQuery} />
                            {
                                (this.state.searchQuery && (!this.state.selectedAdminUsername || this.state.searchFocused)) ?
                                    (
                                        <Table className="mx-3 w-auto">
                                            <thead>
                                                <tr>
                                                    <th>Users</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Array.from(Object.entries(userMap))
                                                        .filter(([_, user]) =>
                                                            user.username.toLowerCase().includes(this.state.searchQuery.toLowerCase()) && !playlist.admins.includes(user.username)) 
                                                        .map(([_, user]) => (
                                                            <tr className="dropdown-item"
                                                                role="button"
                                                                style={{ display: "table-row" }}
                                                                onClick={() => { this.setState({ selectedAdminUsername: user.username, searchFocused: false }); console.log(user.username) }}
                                                            >
                                                                <td>{user.username}</td>
                                                            </tr>
                                                        ))
                                                }
                                            </tbody>
                                        </Table>
                                    )
                                    : ""
                            }
                            {
                                this.state.selectedAdminUsername ? userMap[this.state.selectedAdminUsername].username : ""
                            }
                            {/* <Button variant="secondary" style={{ borderRadius: "0px 5px 5px 0px", borderLeft: "none" }}>Search</Button> */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "flex-start" }}>
                        <Button variant="secondary" onClick={() => { this.setState({ searchQuery: "", searchFocused: false, selectedAdminUsername: "", showHide: false }) }}>
                            Close this window
                        </Button>
                        {
                            this.state.selectedAdminUsername ? (
                                <Button variant="primary" onClick={() => {
                                    playlistMap[playlist.id].admins.push(userMap[this.state.selectedAdminUsername].username);
                                    this.setState({searchQuery: "", searchFocused: false, selectedAdminUsername: "", showHide: false});
                                }}>
                                    Add Administrator
                                </Button>
                            ) : ""
                        }
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
