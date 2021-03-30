import React from 'react'
import { Modal, Button, Container, Row, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { playlistMap } from "../../data";

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

        return (
            <Container fluid>
                <Row>
                    <Link to={`/playlist/${playlist.id}`}>Go back to playlist</Link>
                </Row>
                <Row>
                    <div style={{ fontSize: "48px" }}>Manage Administrators</div>
                </Row>
                <Row>
                    <p>Playlist: <Link to={`/user/${playlist.creator.username}`}>{playlist.creator.displayName}</Link>'s playlist "{playlist.title}"</p>
                </Row>
                <Row>
                    <div style={{ fontSize: "28px" }}>Current Administrators</div>
                </Row>
                <Row>joe-is-cool</Row>
                <Row>michelle1721</Row>
                <Row>aaron1200</Row>
                <Row>
                    <Button variant="primary" onClick={() => this.handleModalShowHide()}>Add new administrator</Button>
                </Row>
                <Row>
                    <Button>Remove an administrator</Button>
                </Row>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Add New Administrator</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form inline>
                            <FormControl type="text" placeholder="Search Users..." className="mr-sm-2" />
                            <Button variant="outline-light">Search</Button>
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
