import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p style={{ fontSize: "12px", color: "black" }}>
              Crafted By - SoumyakantiDev @ &copy; {currentYear}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
