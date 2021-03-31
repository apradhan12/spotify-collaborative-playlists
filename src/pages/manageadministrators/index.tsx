import React from 'react'
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {playlistMap, userMap} from "../../common/data";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
}

interface State {
    showHide: boolean;
}

export default class ManageAdmin extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            showHide: false
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    render(){
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
                                    <li>
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

                <Modal show={this.state.showHide} backdrop="static">
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
