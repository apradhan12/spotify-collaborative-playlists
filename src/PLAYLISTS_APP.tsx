import React from 'react';
import {Container} from 'react-bootstrap';
import {HashRouter as Router, Route} from 'react-router-dom'
import CustomNavbar from './common/components/CustomNavbar';

import Homepage from './pages/homepage';
import PlaylistPage from './pages/playlist';

import './common/css/typography.css';
import RequestsPage from "./pages/requests";
import UserProfile from './pages/userprofilepage';
import ManageAdmin from './pages/manageadministrators';

class PLAYLISTS_APP extends React.Component {
    render() {
        return (
            <Container fluid>
                <CustomNavbar displayName="jacob1972" loggedIn={false}/>
                <Router>
                    <Route path="/" component={Homepage} exact/>

                    {/* In order to access this playlist ID from the pages that need it, you need to use props.match.params.<VARIABLE_NAME> in that component */}
                    <Route path="/playlist/:playlistId" component={PlaylistPage} exact/>
                    <Route path="/playlist/:playlistId/requests" component={RequestsPage} exact/>

                    {/* Route to User profile page */}
                    <Route path="/user/:username" component={UserProfile} exact/>

                    {/* Route to User profile page */}
                    <Route path="/playlist/:playlistId/admins" component={ManageAdmin} exact/>
                </Router>
            </Container>
        );
    }
}

export default PLAYLISTS_APP;
