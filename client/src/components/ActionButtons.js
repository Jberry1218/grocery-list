import React from "react";
import ItemSubmitModal from "./ItemSubmitModal";
import {
    Container,
    Button
} from "reactstrap";
import { EyeIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 
import { resetFoundItems } from "../actions/itemsActions";

function ActionButtons(props) {

    const shoppingMode = props.itemsList.shoppingMode;

    return (
        <div className={props.isAuthenticated ? "visible" : "hidden"}>
            <Container className="action-button-container">
                <ItemSubmitModal />
                <Button 
                    onClick={() => props.resetFoundItems()}
                    className={shoppingMode ? "action-button hidden" : "action-button visible"}
                >
                    <EyeIcon className="button-icon"/>
                    Reset Found
                </Button>
            </Container>
        </div>
    );
}

ActionButtons.propTypes = {
    resetFoundItems: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    itemsList: state.itemsList,
    isAuthenticated: state.users.isAuthenticated
});

export default connect(mapStateToProps, { resetFoundItems })(ActionButtons);