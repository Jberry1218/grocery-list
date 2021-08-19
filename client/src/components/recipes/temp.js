import React, { useEffect } from "react";
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { getRecipes, clearRecipes } from "../../actions/recipesActions";

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
        <Container className="mb-5">
            {recipes.map(recipe => {
                    return (
                        <div className="container" key={recipe.name}>
                            <div className="row">
                                <ListGroupItem className="category-header col-12 col-sm-9 mt-3 mb-1">
                                    {recipe.name.toUpperCase()}
                                </ListGroupItem>
                                <div className="flex col-12 col-sm-3 mt-3 mb-1">
                                    <Button
                                        color="secondary"
                                        onClick={() => props.resetFoundItems()}
                                        className="col-12 col-md-6"
                                    >
                                        <PencilAltIcon className="button-icon"/>
                                    </Button>
                                    <Button
                                        color="danger"
                                        onClick={() => props.resetFoundItems()}
                                        className="col-12 col-md-6"
                                    >
                                        <TrashIcon className="button-icon"/>
                                    </Button>
                                </div>
                                {
                                    recipe.ingredients.map(ingredient => {
                                    return ( 
                                        <ListGroup 
                                            key={ingredient.id} 
                                            className="col-12 col-lg-6 p-0"
                                        >
                                            <ListGroupItem>
                                                {ingredient.name[0].toUpperCase() + ingredient.name.slice(1)}
                                            </ListGroupItem>
                                        </ListGroup>
                                    )
                                    })
                                }
                            </div>
                        </div>
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
    clearRecipes
})(RecipeList);