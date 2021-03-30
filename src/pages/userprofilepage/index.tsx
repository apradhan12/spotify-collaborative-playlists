import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import {playlistMap, userMap} from "../../data";

interface Props {
    match: {
        params: {
            username: string;
        }
    }
}

export default class UserProfile extends React.Component<Props> {
    render() {
        const user = userMap[this.props.match.params.username];
        const playlists = user.playlistIds.map(id => playlistMap[id]);
        return (
            <Container fluid>
                <Row>
                    <img src="https://picsum.photos/200/300"  alt={`${user.displayName}'s profile`} />
                    <Col>
                        <Row>
                            <div style={{ fontSize: "48px" }}>{user.username}</div>
                        </Row>
                        <Row>{user.followers} followers</Row>
                        <Row>{playlists.length} playlists</Row>
                    </Col>
                </Row>
                <Row>
                    <div style={{ fontSize: "48px" }}>User Playlists</div>
                </Row>
                <Row>
                    <Col>Title</Col>
                    <Col>Date Created</Col>
                    <Col>Number of Songs</Col>
                    <Col>Duration</Col>
                </Row>
                <hr/>
            </Container>
        )
    }
}

