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

function AppNavbar() {

    const [isOpen, toggleOpen] = useState(false);

    return (
        <div>
            <Navbar color="dark" dark expand="md" className="mb-3 px-3">
                <NavbarBrand href="/">
                    <img src={process.env.PUBLIC_URL + "/groceries.png"} className="me-2" style={{width: "30px"}}/> 
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
                            <NavLink href="/">
                                Build List
                            </NavLink>
                        </NavItem>
                        <NavItem className="ml-auto">
                            <NavLink href="/">
                                View Lists
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppNavbar;