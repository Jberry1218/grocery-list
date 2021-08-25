import React from "react";
import { connect } from "react-redux";

function Welcome(props) {
    return (
        <div className="welcome-div">
            <div className="welcome-image-div">
                <img src={process.env.PUBLIC_URL + "/groceries.png"} 
                    alt="logo"
                    className="welcome-image" />
            </div>
            <div className="welcome-text-div">
                <span className="welcome-title">GroceryPlanner</span>
                Manage your grocery list and recipes in one, easy-to-use application
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Welcome);