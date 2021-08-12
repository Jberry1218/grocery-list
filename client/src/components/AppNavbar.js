import React, { useState } from "react";
import ItemSubmitModal from "./ItemSubmitModal";
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
import { useDispatch } from "react-redux";
import { toggleShopping } from "../redux/slices/itemsSlice";

function AppNavbar() {

    const [isOpen, toggleOpen] = useState(false);

    const dispatch = useDispatch();

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
                            <ItemSubmitModal />
                        </NavItem>
                        <NavItem className="ml-auto">
                            <Button 
                                color="dark"
                                onClick={() => dispatch(toggleShopping())}
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

export default AppNavbar;