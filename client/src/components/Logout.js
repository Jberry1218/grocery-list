import React from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 
import { logout } from "../actions/usersActions";

function Logout(props) {
    return (
        <div className={ props.isAuthenticated ? "visible" : "hidden"}>
            <NavLink
                href="#"
                onClick={props.logout}
            >
                Log Out
            </NavLink>
        </div>
    )
}

Logout.propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Logout);