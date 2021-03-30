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
                        Hello world
                    </Col>
                </Row>
            </Container>
        )
    }
}