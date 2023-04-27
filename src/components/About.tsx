import { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (
        <Container className="my-5" style={{ backgroundColor: "lightblue" }}>
            <Row>
                <Col xs={12} md={6}>
                    <h1>About Us</h1>
                    <p>We are a team of developers dedicated to creating awesome software.</p>
                    <p>Our mission is to make technology accessible to everyone.</p>
                </Col>
                <Col xs={12} md={6}>
                    <img src="https://www.jcommerce.eu/wp-content/uploads/2021/07/team_delivery_cover.jpg" className="img-fluid" alt="Our team" />
                </Col>
            </Row>
        </Container>
    );
}

export default About;
