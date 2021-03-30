import React from 'react'
<<<<<<< HEAD
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
=======
import { Modal, Button, Container, Row } from "react-bootstrap";
>>>>>>> Fix modal
import { Link } from "react-router-dom";
import {playlistMap, userMap} from "../../data";

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
                        <p>Playlist: <Link to={`/user/${creator.username}`}>{creator.displayName}</Link>'s playlist "{playlist.title}"</p>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col xs={12}>
                        <h3 className="museo-display-light">Current Administrators</h3>
                        <ul>
                            <li>
                                <p className="m-0">joe-is-cool</p>
                            </li>
                            <li>
                                <p className="m-0">michelle1721</p>
                            </li>
                            <li>
                                <p className="m-0">aaron1200</p>
                            </li>
                        </ul>

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

                <Modal show={this.state.showHide}>
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
