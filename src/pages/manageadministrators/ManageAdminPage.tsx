import React from 'react'
import { Modal, Button, Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";

// interface Props {
//     match: {
//         params: {
//             playlistId: string;
//         }
//     }
// }

class ManageAdmin extends React.Component {

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
        return (
            <Container fluid>
                <Row>
                    <Link to="/">Go back to playlist</Link>
                </Row>
                <Row>
                    <div style={{ fontSize: "48px" }}>Manage Administrators</div>
                </Row>
                <Row>
                    <p>Playlist: <Link to="/">Aaron's playlist "60s/70s Rock</Link> by <Link to="/user/:username">aaron1200</Link></p>
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

export default ManageAdmin;