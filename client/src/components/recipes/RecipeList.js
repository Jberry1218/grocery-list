import React, { useEffect } from "react";
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";
import EditRecipeModal from "./EditRecipeModal";
import { TrashIcon, BookOpenIcon } from "@heroicons/react/solid";
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
                            <div className="recipe-header mt-3 mb-1">
                                <div className="row m-auto">
                                    <ListGroupItem className="recipe-title col-12 text-center">
                                        <a  className="recipe-link"
                                            href={recipe.url ? recipe.url : `#${recipe.name}`}
                                            target={recipe.url ? "_blank" : "_self"}
                                        >
                                            <BookOpenIcon className={recipe.url ? "button-icon" : "hidden"} />
                                        </a>
                                            {recipe.name.toUpperCase()}
                                    </ListGroupItem>
                                </div>
                                <div className="row m-0 justify-content-center">
                                    <div className="col-5 col-md-2 flex-center">
                                        <EditRecipeModal name={recipe.name}/>
                                    </div>
                                    <div className="col-1" />
                                    <div className="col-5 col-md-2 flex-center">
                                        <Button
                                            color="danger"
                                            onClick={() => props.deleteRecipe({ id: recipe._id })}
                                            style={{width: 100}}
                                            className="flex-center"
                                        >
                                            <TrashIcon className="button-icon"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row m-auto">
                                {
                                    recipe.ingredients.map(ingredient => {
                                    return ( 
                                        <ListGroup 
                                            key={ingredient.id} 
                                            className="col-12 col-lg-6 p-0 flex"
                                        >
                                            <ListGroupItem className="ingredient-default">
                                                <div className="item-container row">
                                                    <div className="ingredient-count col-2 col-md-3">
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