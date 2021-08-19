import React from "react";
import { connect } from "react-redux";
import RecipeSubmitModal from "./RecipeSubmitModal";
import RecipeList from "./RecipeList";

function Recipes(props) {

    return (
        <div className={props.page === "recipes" ? "visible body" : "hidden"}>
           <RecipeSubmitModal /> 
           <RecipeList /> 
        </div>
    );
}

const mapStateToProps = (state) => ({
    page: state.page.page
});

export default connect(mapStateToProps, {})(Recipes);