import React from "react";
import { connect } from "react-redux";
import CreateRecipeModal from "./CreateRecipeModal";
import RecipeList from "./RecipeList";

function Recipes(props) {

    return (
        <div className={props.page === "recipes" ? "visible body" : "hidden"}>
           <CreateRecipeModal /> 
           <RecipeList /> 
        </div>
    );
}

const mapStateToProps = (state) => ({
    page: state.page.page
});

export default connect(mapStateToProps, {})(Recipes);