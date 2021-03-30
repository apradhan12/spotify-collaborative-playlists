import React from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";
import { User } from "../../common/types";

interface Props {
    match: {
        params: {
            userId: string;
        }
    }
}

interface UserMap {
    [key: string]: User;
}

const idMapping: UserMap = {
    user1: {
        username: "aaron1200",
        displayName: "Aaron Pradhan",
        profilePictureURL: "/album.jpg",
        playlists: [],
        followers: 20,
        following: 31
    }
}

class UserProfile extends React.Component {
    render() {
        const user = idMapping.user1
        return (
            <Container fluid>
                <Row>
                    <img src="https://picsum.photos/200/300" />
                    <Col>
                        <Row>
                            <div style={{ fontSize: "48px" }}>{user.username}</div>
                        </Row>
                        <Row>{user.followers} followers</Row>
                        <Row>{user.playlists.length} playlists</Row>
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

export default UserProfile;

