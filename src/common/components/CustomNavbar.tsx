import React from 'react'
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'

export default class CustomNavbar extends React.Component {
  render() {
    return (
      <Navbar fixed="top" bg="primary" variant="dark" className="museo-300">
        <Navbar.Brand href="#home">
          <p className="museo-display-black m-0">Spotify Collaborative Playlists</p>
          </Navbar.Brand>
        <Nav className="mr-auto">
          <Form inline >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Nav>
        <Navbar.Text>
          Logged in as jacob1972
        </Navbar.Text>
      </Navbar>
    )
  }
}
