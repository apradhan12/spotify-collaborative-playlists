import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import PlaylistSearchBar from '../../common/components/PlaylistSearchBar';

class Homepage extends React.Component {
    render() {
        return (
            <Container className="museo-300">
                <Row>
                    <Col className="text-center d-flex flex-column justify-content-center align-items-center" style={{height: "92vh"}}>
                   
                            <h1 className="museo-display-black">
                                Spotify Collaborative Playlists
                            </h1>
                            <PlaylistSearchBar placeholder="Search for playlists..." dark={true}/>
                    
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Homepage;