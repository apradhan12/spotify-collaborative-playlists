import React from 'react'
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {playlistMap} from "../../data";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
}

export default class ManageAdmin extends React.Component<Props> {

    // constructor(props: Props){
    //     super(props);
    //     this.state = {
    //         showHide : false
    //     }
    // }

    // handleModalShowHide() {
    //     this.setState({ showHide: !this.state.showHide })
    // }

    render(){
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
                    <Button>Add new administrator</Button>
                </Row>
                <Row>
                    <Button>Remove an administrator</Button>
                </Row>
            </Container>
        )
    }
}
