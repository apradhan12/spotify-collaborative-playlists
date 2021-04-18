import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlaylistSearchBar from '../../common/components/PlaylistSearchBar';
import { playlistMap } from '../../common/data';

class Homepage extends React.Component {
    render() {
        return (
            <Container className="museo-300">
                <Row>
                    <Col className="text-left d-flex flex-column justify-content-center align-items-center" style={{height: "50vh"}}>
                        <h1 className="museo-display-black mb-3">
                            Spotify Collaborative Playlists
                        </h1>
                        <PlaylistSearchBar placeholder="Search for playlists..." dark={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h3 className="museo-display-light mb-1">
                            Recommended Playlists
                        </h3>
                        <hr style={{border: "1px solid lightgrey"}} className="mb-4"/>
                    </Col>
                    { Array.from(Object.entries(playlistMap))
                        .slice(0, 4)
                        .map(([_, playlist]) => {
                            return (   
                                <Col xs="3" style={{padding: ".5em"}} key={playlist.id}>
                                    <Link to={`/playlist/${playlist.id}`}>
                                        <div style={{boxShadow: "1px 1px 10px gray", padding: ".75em", borderRadius: "10px", height: "100%"}}> 
                                            <Image className="mb-3" fluid src={process.env.PUBLIC_URL + playlist.pictureURL} />
                                            <p className="mb-1 museo-700">{playlist.title}</p>
                                            <p className="mb-1">{playlist.creator}</p>
                                            <p className="mb-1">{playlist.songIds.length} {playlist.songIds.length === 1 ? "song" : "songs"}</p>
                                        </div>
                                    </Link>
                                </Col>
                            )
                        })


                    }
                </Row>
            </Container>
        )
    }
}

export default Homepage;