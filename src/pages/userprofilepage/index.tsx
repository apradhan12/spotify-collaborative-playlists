import React from 'react'
import { Col, Container, Row, Image, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { playlistMap, userMap } from "../../common/data";

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
            <Container className="museo-300">
                <Row className="my-4">
                    <Col xs={4}>
                        <Image src={process.env.PUBLIC_URL + user.profilePictureURL} alt={`${user.displayName}'s profile`} fluid />
                    </Col>
                    <Col xs={8}>
                        <h1 className="museo-display-black">{user.displayName}</h1>
                        <p className="m-0">{user.followers} followers</p>
                        <p>{playlists.length} playlists</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="museo-display-light">User Playlists</h3>
                        <Table striped bordered hover className="museo-300">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date Created</th>
                                <th>Number of Songs</th>
                                <th>Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><Link to="/playlist/abc">60s/70s Rock</Link></td>
                                <td>2021-03-30</td>
                                <td>2</td>
                                <td>9 min</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

