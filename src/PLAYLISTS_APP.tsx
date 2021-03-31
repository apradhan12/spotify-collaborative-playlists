import React, { ChangeEvent } from 'react';
import {Button, Container, Modal} from 'react-bootstrap';
import {HashRouter as Router, Route} from 'react-router-dom'
import CustomNavbar from './common/components/CustomNavbar';

import Homepage from './pages/homepage';
import PlaylistPage from './pages/playlist';

import './common/css/typography.css';
import RequestsPage from "./pages/requests";
import UserProfile from './pages/userprofilepage';
import ManageAdmin from './pages/manageadministrators';

import { User } from './common/types';
import { Form } from 'react-bootstrap';
import { userMap } from './common/data';


interface State {
    showHide: boolean;
    loggedInUser: User | null;
    inputUsername: string;
    inputPassword: string;
}

class PLAYLISTS_APP extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);

        this.state = {
            showHide: false,
            loggedInUser: null,
            inputUsername: "",
            inputPassword: ""
        }

        this.handleModalShowHide = this.handleModalShowHide.bind(this);
        this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
    }


    handleModalShowHide(): void {
        this.setState(prevState => ({ showHide: !prevState.showHide }));
    }

    handleLoginInput(type: 'username' | 'password'): (event: ChangeEvent<HTMLInputElement>) => void {
        if (type === "username") {
            return (event: ChangeEvent<HTMLInputElement>) => {
                this.setState({inputUsername: event.target.value})
            }
        } else {
            return (event: ChangeEvent<HTMLInputElement>) => {
                this.setState({inputPassword: event.target.value})
            }
        }
    }

    handleLoginSubmission(): void {
        if (this.state.inputUsername && this.state.inputPassword) {
            if (this.state.inputPassword.toLowerCase() === "password" && this.state.inputUsername.toLowerCase() === "hci2021") {
                this.setState({
                    loggedInUser: userMap['hci2021'],
                    showHide: false,
                    inputPassword: "",
                    inputUsername: ''
                })
            }
        }
    }

    render() {

        let { loggedInUser } = this.state;

        return (
            <div>
                <CustomNavbar username={loggedInUser ? loggedInUser.username : ""} displayName={loggedInUser ? loggedInUser.displayName : ''} loggedIn={loggedInUser !== null} toggleLoginModal={this.handleModalShowHide}/>
                <Container fluid>
                    <Router>
                        <Route path="/" component={Homepage} exact/>

                        {/* In order to access this playlist ID from the pages that need it, you need to use props.match.params.<VARIABLE_NAME> in that component */}

                        {/*@ts-ignore */}
                        <Route path="/playlist/:playlistId" component={({ match, location }) => <PlaylistPage loggedInUsername={loggedInUser ? loggedInUser.username : ""} match={match} location={location} />} exact/>
                        {/*@ts-ignore */}
                        <Route path="/playlist/:playlistId/requests" component={({ match, location }) => <RequestsPage loggedInUsername={loggedInUser ? loggedInUser.username : ""} match={match} location={location} />} exact/>

                        {/* Route to User profile page */}
                        <Route path="/user/:username" component={UserProfile} exact/>

                        {/* Route to User profile page */}
                        <Route path="/playlist/:playlistId/admins" component={ManageAdmin} exact/>
                    </Router>

                    <Modal show={this.state.showHide} animation={false} backdrop="static">
                    <Modal.Header onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Log into your account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username..." value={this.state.inputUsername} onChange={this.handleLoginInput('username')} />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password..." value={this.state.inputPassword} onChange={this.handleLoginInput('password')} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "flex-start"}}>
                        <Button variant="primary" onClick={this.handleLoginSubmission}>
                            Log in
                        </Button>
                        <Button variant="outline-danger" onClick={() => {this.setState({inputPassword: "", inputUsername: "", showHide: false})}}>
                            Close this window
                        </Button>
                    </Modal.Footer>
                </Modal>
                </Container>
            </div>
        );
    }
}

export default PLAYLISTS_APP;
