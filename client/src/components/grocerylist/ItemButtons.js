import React from "react";
import ItemSubmitModal from "./ItemSubmitModal";
import {
    Container,
    Button
} from "reactstrap";
import { EyeIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { resetFoundItems, toggleShoppingMode } from "../../actions/itemsActions";

function ActionButtons(props) {

    const shoppingMode = props.items.shoppingMode;

    return (
        <div className={props.isAuthenticated ? "visible" : "hidden"}>
            <Container className="action-button-container">
                <ItemSubmitModal />
                <Button 
                    onClick={() => props.resetFoundItems()}
                    className={shoppingMode ? "action-button hidden" : "action-button visible mt-3"}
                >
                    <EyeIcon className="button-icon"/>
                    Reset Found
                </Button>
                <Button 
                    color="success"
                    onClick={() => props.toggleShoppingMode()}
                    className="action-button mt-3"
                >
                    <ShoppingCartIcon className="button-icon"/>
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

export default connect(mapStateToProps, { resetFoundItems, toggleShoppingMode })(ActionButtons);