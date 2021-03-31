import React from 'react'
import {Navbar, Button, Nav, Image} from 'react-bootstrap'
import { User } from '../types'
import PlaylistSearchBar from './PlaylistSearchBar'

interface CustomNavbarProps {
    user: User | null;
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
                    this.props.user ?
                        <Navbar.Text>
                            Logged in as 
                            <Nav.Link className="d-inline p-0 ml-2" href={`#/user/${this.props.user.username}`}>
                                <span>
                                    {this.props.user.displayName}
                                    <Image fluid src={process.env.PUBLIC_URL + this.props.user.profilePictureURL} style={{maxWidth: "30px", marginLeft: "5px"}} />
                                </span>
                            </Nav.Link>
                        </Navbar.Text> :
                        <Button variant="light" onClick={this.props.toggleLoginModal}>
                            Log in
                        </Button>
                }
            </Navbar>
        )
    }
}
