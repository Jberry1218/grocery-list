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
import { getPage } from "../actions/pageActions";
import RegisterModal from "./authentication/RegisterModal";
import LoginModal from "./authentication/LoginModal";
import Logout from "./authentication/Logout";

function AppNavbar(props) {

    const [isOpen, toggleOpen] = useState(false);

    return (
        <div>
            <Navbar color="dark" dark expand="md" className="px-3">
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
                                onClick={() => props.getPage("grocery-list")}
                            >
                                Grocery List
                            </NavLink>
                        </NavItem>
                        <NavItem className={props.isAuthenticated ? "ml-auto visible" : "hidden"}>
                            <NavLink 
                                href="#"
                                onClick={() => props.getPage("recipes")}
                            >
                                Recipes
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
    isAuthenticated: state.users.isAuthenticated,
    page: state.page.page
});

export default connect(mapStateToProps, { getPage })(AppNavbar);