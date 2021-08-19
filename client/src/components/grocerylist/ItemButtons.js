import React from "react";
import ItemSubmitModal from "./ItemSubmitModal";
import {
    Container,
    Button
} from "reactstrap";
import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { resetFoundItems, toggleShoppingMode } from "../../actions/itemsActions";

function ItemButtons(props) {

    const shoppingMode = props.items.shoppingMode;

    return (
        <div className={props.isAuthenticated ? "visible" : "hidden"}>
            <Container className="action-button-container">
                <ItemSubmitModal />
                <Button 
                    onClick={() => props.resetFoundItems()}
                    className={shoppingMode ? "hidden" : "action-button visible mt-3"}
                >
                    <EyeIcon className="button-icon me-2"/>
                    Reset Found
                </Button>
                <Button 
                    color="success"
                    onClick={() => props.toggleShoppingMode()}
                    className="action-button mt-3"
                >
                    <ShoppingCartIcon className="button-icon me-2"/>
                    Shopping Mode
                </Button>
            </Container>
        </div>
    );
}

const mapStateToProps = (state) => ({
    items: state.items,
    isAuthenticated: state.users.isAuthenticated
});

export default connect(mapStateToProps, { resetFoundItems, toggleShoppingMode })(ItemButtons);