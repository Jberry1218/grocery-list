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
import { login } from "../../actions/usersActions";
import { clearErrors } from "../../actions/errorsActions";

function LoginModal(props) {

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
        props.clearErrors();
    }

    const [emailInput, changeEmailInput] = useState("");
    const [passwordInput, changePasswordInput] = useState("");
    const [message, changeMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let profile = {
            email: emailInput,
            password: passwordInput,
        };
        props.login(profile);
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            setModal(false);
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        if (props.error && props.error.id === "LOGIN_FAIL") {
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
                Log In
            </NavLink>
            <Modal
                isOpen={modal}
                toggle={toggleModal}
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        Login
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
                                Log In
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isAuthenticated,
    error: state.errors
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);