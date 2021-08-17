import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import { connect } from "react-redux";
import { toggleShoppingMode } from "../actions/itemsActions";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import Logout from "./Logout";

function AppNavbar(props) {

    const [isOpen, toggleOpen] = useState(false);

    return (
        <div>
            <Navbar color="dark" dark expand="md" className="mb-3 px-3">
                <NavbarBrand href="/">
                    <img src={process.env.PUBLIC_URL + "/groceries.png"} alt="logo" className="me-2" style={{width: "30px"}}/> 
                    {props.user ? props.user.firstName+"'s Grocery List" : "Grocery List"}
                </NavbarBrand>
                <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
                <Collapse isOpen={ isOpen } navbar>
                    <Nav navbar>
                        <NavItem>
                            <RegisterModal />
                        </NavItem>
                        <NavItem>
                            <LoginModal />
                        </NavItem>
                        <NavItem>
                            <Logout />
                        </NavItem>
                    </Nav>
                    <Nav className="ms-auto" navbar>
                        <NavItem className={props.isAuthenticated ? "ml-auto visible" : "hidden"}>
                            <NavLink 
                                href="#"
                                onClick={() => props.toggleShoppingMode()}
                            >
                                Shopping Mode
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.users.user,
    isAuthenticated: state.users.isAuthenticated
});

export default connect(mapStateToProps, { toggleShoppingMode })(AppNavbar);