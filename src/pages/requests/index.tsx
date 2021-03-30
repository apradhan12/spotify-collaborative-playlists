import {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";

interface Props {
    match: {
        params: {
            playlistId: string;
        }
    }
}

export default class RequestsPage extends Component<Props> {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        &#8592; Go back to playlist
                    </Col>
                </Row>
            </Container>
        )
    }
}