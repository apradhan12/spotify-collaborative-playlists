import {Component} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Playlist} from "../../common/types";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
}

interface PlaylistMap {
    [key: string]: Playlist;
}

const idMapping: PlaylistMap = {
    abc: {
        id: "abc",
        title: "60s/70s Rock",
        pictureURL: "/album.jpg",
        description: "Best rock songs of the 1960s and 1970s",
        songs: [],
        creator: {
            username: "aaron1200",
            displayName: "Aaron",
            profilePictureURL: "/album.jpg",
            playlists: [],
            followers: 20,
            following: 31
        },
        admins: [],
        requests: []
    }
}

export default class RequestsPage extends Component<Props> {
    render() {
        const playlist = idMapping[this.props.match.params.playlistId];
        return (
            <Container>
              <Row>
                <img src={process.env.PUBLIC_URL + playlist.pictureURL} alt="Album cover" width="200" height="200" />
                <Col>
                    Playlist<br />
                    <h1>{playlist.title}</h1>
                    Created by {playlist.creator.displayName} * {playlist.songs.length} songs, 7 hr 48 min<br />
                    <Button>Share</Button>
                </Col>
              </Row>
              <Row>
                <Col>1 of 3</Col>
                <Col>2 of 3</Col>
                <Col>3 of 3</Col>
              </Row>
            </Container>
        );
        // return 'REQUESTS PAGE FOR PLAYLIST ID: ' +
    }
}
