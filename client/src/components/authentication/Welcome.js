import React from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";

function Welcome(props) {
    return (
        <Container className="body">
            <img src={process.env.PUBLIC_URL + "/groceries.png"} 
                alt="logo"
                className="welcome-image" />
        </Container>
    )
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Welcome);