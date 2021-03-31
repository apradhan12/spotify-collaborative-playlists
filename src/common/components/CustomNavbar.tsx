import React from 'react'
import {Navbar, Button, Nav} from 'react-bootstrap'
import PlaylistSearchBar from './PlaylistSearchBar'

interface CustomNavbarProps {
    loggedIn: boolean;
    displayName?: string;
    username?: string;
    toggleLoginModal: () => void;
}

export default class CustomNavbar extends React.Component<CustomNavbarProps> {
    render() {
        return (
            <Navbar style={{backgroundColor: "#6eaedd"}} variant="dark" className="museo-300">
                <Navbar.Brand href="#">
                    <p className="museo-display-black m-0">Spotify Collaborative Playlists</p>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#playlist/abc/requests">
                        Requests
                    </Nav.Link>
                    <Nav.Link href="#playlist/abc">
                        Playlist
                    </Nav.Link>
                    <Nav.Link href="#user/aaron1200">
                        User
                    </Nav.Link>
                    <Nav.Link href="#playlist/abc/admins">
                        Admin
                    </Nav.Link>
                </Nav>
                <PlaylistSearchBar placeholder="Search for playlists..." />
                {
                    this.props.loggedIn ?
                        <Navbar.Text>
                            Logged in as 
                            <Nav.Link className="d-inline" href={`#/user/${this.props.username}`}>{this.props.displayName}</Nav.Link>
                        </Navbar.Text> :
                        <Button variant="light" onClick={this.props.toggleLoginModal}>
                            Log in
                        </Button>
                }
            </Navbar>
        )
    }
}
