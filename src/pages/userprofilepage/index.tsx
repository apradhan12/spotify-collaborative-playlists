import React from 'react'
import { Col, Container, Row, Table } from "react-bootstrap";
import { userMap } from "../../data";
import {playlistMap} from "../../data";

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
        return (
            <Container fluid>
                <Row>
                    <img src={process.env.PUBLIC_URL + user.profilePictureURL} alt="Album cover" width="200" height="200"/>
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
                <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Number of Songs</th>
                                <th>Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                Array.from(user.playlists.entries()).map(([i, playlist]) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{playlist.title}</td>
                                        <td>{playlist.description}</td>
                                        <td>{playlist.songs.length}</td>
                                        <td>test</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

