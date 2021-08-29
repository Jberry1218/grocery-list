import React, { useEffect } from "react";
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";
import EditRecipeModal from "./EditRecipeModal";
import { TrashIcon, AnnotationIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { getRecipes, clearRecipes, deleteRecipe } from "../../actions/recipesActions";

function RecipeList(props) {
    
    const recipes = props.recipes.recipes;

    useEffect(() => {
        if (props.user) {
            props.getRecipes(props.user._id);
        }
    }, [props.user]);

    useEffect(() => {
        if (!props.isAuthenticated) {
            props.clearRecipes();
        }
    }, [props.isAuthenticated]);

    return (
        <Container>
            {recipes.map(recipe => {
                    return (
                        <Container className="p-0" key={recipe.name}>
                            <div className="recipe-header px-3 m-auto mt-3 mb-1">
                                <div className="recipe-title-div col-12 col-md-6">
                                    <a  className={recipe.url ? "btn p-1 recipe-link" : "hidden"}
                                        href={recipe.url ? recipe.url : `#${recipe.name}`}
                                        target={recipe.url ? "_blank" : "_self"}
                                    >
                                        <AnnotationIcon className={recipe.url ? "button-icon" : "hidden"} />
                                    </a>
                                    <span className="recipe-title ms-2">{recipe.name.toUpperCase()}</span>  
                                </div>
                                <div className="recipe-header-buttons col-12 col-md-3">
                                    <EditRecipeModal name={recipe.name}/>
                                    <Button
                                        color="danger"
                                        onClick={() => props.deleteRecipe({ id: recipe._id })}
                                        className="ms-2"
                                    >
                                        <TrashIcon className="button-icon"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="row m-auto">
                                {
                                    recipe.ingredients.map(ingredient => {
                                    return ( 
                                        <ListGroup 
                                            key={ingredient.id} 
                                            className="col-12 col-lg-6 p-0"
                                        >
                                            <ListGroupItem className="ingredient-default">
                                                <div className="item-container">
                                                    <div className="ingredient-count col-2 col-md-2">
                                                            {ingredient.count}
                                                    </div>
                                                    <div className="col-5 col-md-7 text-center">
                                                        {ingredient.name[0].toUpperCase() + ingredient.name.slice(1)}
                                                    </div>
                                                    <div className="ingredient-category-div col-5 col-md-3 text-end">
                                                            {ingredient.category}
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                        </ListGroup>
                                    )
                                    })
                                }
                            </div>
                        </Container>
                    )
                })
            }
        </Container>
    );
}

const mapStateToProps = (state) => ({
    recipes: state.recipes,
    user: state.users.user,
    isAuthenticated: state.users.isAuthenticated
});

export default connect(mapStateToProps, {
    getRecipes,
    clearRecipes,
    deleteRecipe
})(RecipeList);


