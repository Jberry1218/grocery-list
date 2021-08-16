import React, { useState } from "react";
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 
import { toggleShoppingMode } from "../actions/itemsActions";

function AppNavbar(props) {

    const [isOpen, toggleOpen] = useState(false);

    return (
        <div>
            <Navbar color="dark" dark expand="md" className="mb-3 px-3">
                <NavbarBrand href="/">
                    <img src={process.env.PUBLIC_URL + "/groceries.png"} alt="logo" className="me-2" style={{width: "30px"}}/> 
                    GroceryList
                </NavbarBrand>
                <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
                <Collapse isOpen={ isOpen } navbar>
                    <Nav navbar>
                        <NavItem className="ml-auto">
                            <NavLink href="/">
                                Logout
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ms-auto" navbar>
                        <NavItem className="ml-auto">
                            <Button 
                                color="dark"
                                onClick={() => props.toggleShoppingMode()}
                            >
                                Shopping Mode
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

AppNavbar.propTypes = {
    toggleShopping: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { toggleShoppingMode })(AppNavbar);