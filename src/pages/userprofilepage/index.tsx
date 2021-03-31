import React from 'react'
import { Col, Container, Row, Image, Table } from "react-bootstrap";
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
                        <Image src="https://picsum.photos/200/300" fluid alt={`${user.displayName}'s profile`} />
                    </Col>
                    <Col xs={8}>
                        <h1 className="museo-display-black">{user.username}</h1>
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
                                <td><a href="#playlist/abc">60s/70s Rock</a></td>
                                <td>3/30/21</td>
                                <td>2</td>
                                <td>9 min</td>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

