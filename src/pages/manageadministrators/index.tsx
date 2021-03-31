import React from 'react'
import { Button, Container, Row, Col, Modal, Form, FormControl } from "react-bootstrap";
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

    constructor(props: Props) {
        super(props);
        this.state = {
            showHide: false
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
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
                    <Modal.Title>Add new administrator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form inline>
                        <FormControl type="text" placeholder="Type here..." style={{borderRadius: "5px 0px 0px 5px", borderColor: "black"}} />
                        <Button variant ="secondary" style={{borderRadius: "0px 5px 5px 0px", borderLeft: "none"}}>Search</Button>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }
}
