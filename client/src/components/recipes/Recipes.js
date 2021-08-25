import React from "react";
import { connect } from "react-redux";
import CreateRecipeModal from "./CreateRecipeModal";
import RecipeList from "./RecipeList";

function Recipes(props) {

    return (
        <div>
           <CreateRecipeModal /> 
           <RecipeList /> 
        </div>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Recipes);