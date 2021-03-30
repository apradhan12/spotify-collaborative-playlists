import React from 'react';
import {Container} from 'react-bootstrap';
import {HashRouter as Router, Route} from 'react-router-dom'
import CustomNavbar from './common/components/CustomNavbar';

import Homepage from './pages/homepage/Homepage';
import RequestsPage from './pages/requests/RequestsPage';

import './common/css/typography.css'
import UserProfile from './pages/userprofilepage/UserProfilePage';
import ManageAdmin from './pages/manageadministrators/ManageAdminPage';

class PLAYLISTS_APP extends React.Component {
    render() {
        return (
            <Container fluid>
                <CustomNavbar displayName="jacob1972" loggedIn={false}/>
                <Router>
                    <Route path="/" component={Homepage} exact/>

                    {/* In order to access this playlist ID from the pages that need it, you need to use props.match.params.<VARIABLE_NAME> in that component */}
                    <Route path="/playlist/:playlistId/requests" component={RequestsPage} exact/>

                    {/* Route to User profile page */}
                    <Route path="/user/:username" component={UserProfile} exact/>

                    {/* Route to User profile page */}
                    <Route path="/playlist/:playlistid/admins" component={ManageAdmin} exact/>
                </Router>
            </Container>
        );
    }
}

export default PLAYLISTS_APP;
