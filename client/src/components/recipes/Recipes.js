import React from "react";
import { connect } from "react-redux";

function Recipes(props) {

    return (
        <div className={props.page === "recipes" ? "visible" : "hidden"}>
        </div>
    );
}

const mapStateToProps = (state) => ({
    page: state.page.page
});

export default connect(mapStateToProps, {})(Recipes);