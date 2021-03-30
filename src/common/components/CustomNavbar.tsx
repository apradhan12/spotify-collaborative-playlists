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
                        playlist
                    </Nav.Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Type here..." className="mr-sm-2"/>
                        <Button variant="outline-light">Search</Button>
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
