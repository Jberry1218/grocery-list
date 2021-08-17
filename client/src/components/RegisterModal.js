import React, { useState, useEffect } from "react";
import {
    Alert,
    Button, 
    Col,
    NavLink,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 
import { register } from "../actions/usersActions";
import { clearErrors } from "../actions/errorsActions";

function RegisterModal(props) {

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
        props.clearErrors();
    }

    const [firstNameInput, changeFirstNameInput] = useState("");
    const [lastNameInput, changeLastNameInput] = useState("");
    const [emailInput, changeEmailInput] = useState("");
    const [passwordInput, changePasswordInput] = useState("");
    const [message, changeMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let registration = {
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            password: passwordInput,
        };
        props.register(registration);
        if (props.isAuthenticated) {
            setModal(false);
        }
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            setModal(false);
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        if (props.error && props.error.id === "REGISTER_FAIL") {
            changeMessage(props.error.msg.msg);
        } else {
            changeMessage(null);
        }
    }, [props.error]);

    return (
        <div className={ props.isAuthenticated ? "hidden" : "visible"}>
            <NavLink
                href="#"
                onClick={toggleModal}
            >
                Register
            </NavLink>
            <Modal
                isOpen={modal}
                toggle={toggleModal}
                animation={false}
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        Register
                    </h5>
                    <button
                        className="btn-close"
                        onClick={toggleModal}
                    />
                </div>
                <ModalBody>
                    { message ? <Alert color="danger">{message}</Alert> : null }
                    <Form id="item-form" onSubmit={handleSubmit}>
                        <FormGroup row className="mt-1">
                            <Label for="first-name" sm={3}>First Name:</Label>
                            <Col sm={9} className="mb-2">
                                <Input 
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="off"
                                    required
                                    onChange={e => changeFirstNameInput(e.target.value)}
                                />
                            </Col>
                            <Label for="last-name" sm={3}>Last Name:</Label>
                            <Col sm={9} className="mb-2">
                                <Input 
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="off"
                                    required
                                    onChange={e => changeLastNameInput(e.target.value)}
                                />
                            </Col>
                            <Label for="email" sm={3}>Email:</Label>
                            <Col sm={9} className="mb-2">
                                <Input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    required
                                    onChange={e => changeEmailInput(e.target.value)}
                                />
                            </Col>
                            <Label for="password" sm={3}>Password:</Label>
                            <Col sm={9} className="mb-2">
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    required
                                    onChange={e => changePasswordInput(e.target.value)}
                                />
                            </Col>
                            <Button
                                color="dark"
                                className="mt-3"
                            >
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isAuthenticated,
    error: state.errors
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);