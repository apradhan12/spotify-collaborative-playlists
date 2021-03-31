import React from 'react'
import {Navbar, Form, FormControl, Button, Nav} from 'react-bootstrap'

interface CustomNavbarProps {
    loggedIn: boolean;
    displayName?: string;
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
                    <Form inline>
                        <FormControl type="text" placeholder="Type here..." style={{borderRadius: "5px 0px 0px 5px", borderColor: "white"}} />
                        <Button variant="outline-light" style={{borderRadius: "0px 5px 5px 0px", borderLeft: "none"}}>Search</Button>
                    </Form>
                </Nav>
                {
                    this.props.loggedIn ?
                        <Navbar.Text>
                            Logged in as {this.props.displayName}
                        </Navbar.Text> :
                        <Button variant="outline-light">
                            Log in with Spotify
                        </Button>
                }
            </Navbar>
        )
    }
}
