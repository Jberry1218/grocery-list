import React, { useState } from "react";
import {
    Button, 
    Col,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import { PencilAltIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { updateRecipe } from "../../actions/recipesActions";

function EditRecipeModal(props) {

    const recipeList = props.recipes;
    let recipe;

    for (let i = 0; i < recipeList.length; i++) {
        if (recipeList[i].name === props.name) {
            recipe = recipeList[i];
            break;
        }
    }

    const itemsList = props.items.itemsList;

    const [recipeName, changeRecipeName] = useState(recipe.name);
    const [recipeUrl, changeRecipeUrl] = useState(recipe.url);
    const [ingredientCount, changeIngredientCount] = useState(recipe.ingredients.length);
    const [ingredients, changeIngredients] = useState(recipe.ingredients);
    const [deleteView, changeDeleteView] = useState(false);

    let ingredientInputs = [];

    const displayIngredients = () => {
        for (let i = 0; i < ingredientCount; i++) {
            ingredientInputs.push(
                <div className="recipe-row">
                    <Col xs={5} className="mb-2">
                        <Input 
                            type="text"
                            name="name"
                            className="ingredient-name"
                            autoComplete="off"
                            placeholder="Name"
                            value = {ingredients[i] ? ingredients[i].name : ""}
                            required
                            onChange={e => {
                                let newArr = [...ingredients];
                                if (!newArr[i]) newArr[i] = {};
                                newArr[i].name = e.target.value;
                                changeIngredients(newArr);
                            }} 
                        />
                    </Col>
                    <Col xs={5} className="mb-2">
                        <Input 
                            type="text"
                            name="category"
                            className="ingredient-category"
                            autoComplete="off"
                            placeholder="Category"
                            list="categories"
                            value = {ingredients[i] ? ingredients[i].category : ""}
                            required
                            onChange={e => {
                                let newArr = [...ingredients];
                                if (!newArr[i]) newArr[i] = {};
                                newArr[i].category = e.target.value;
                                changeIngredients(newArr);
                            }} 
                        />
                        <datalist id="categories">
                            {itemsList.map(category => {
                                return <option key={category._id}>{category._id[0].toUpperCase() + category._id.slice(1)}</option>
                            })}
                        </datalist>
                    </Col>
                    <Col xs={2} className={deleteView ? "hidden" : "visible mb-2"}>
                        <Input 
                            type="number"
                            name="count"
                            className="ingredient-count-input"
                            placeholder="Count"
                            autoComplete="off"
                            value = {ingredients[i] ? ingredients[i].count : ""}
                            required
                            onChange={e => {
                                let newArr = [...ingredients];
                                if (!newArr[i]) newArr[i] = {};
                                newArr[i].count = e.target.value;
                                changeIngredients(newArr);
                            }} 
                        />
                    </Col>
                    <Col xs={2} className={deleteView ? "visible ms-2 mb-2" : "hidden"}>
                        <Button
                            color="danger"
                            onClick={() => deleteIngredient(i)}           
                        >
                            X
                        </Button>
                    </Col>
                </div>
            )
        }
    }

    displayIngredients();

    const deleteIngredient = (ind) => {
        let newArr = [...ingredients.slice(0, ind), ...ingredients.slice(ind+1, ingredients.length)];
        changeIngredients(newArr);
        changeIngredientCount(ingredientCount - 1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateRecipe({
            id: recipe._id,
            name: recipeName,
            url: recipeUrl,
            userId: props.user._id,
            ingredients: ingredients
        });
        document.getElementById("recipe-form").reset();
        toggleModal();
    }

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <div style={{width: 100}}>
            <Button
                color="secondary"
                onClick={toggleModal}
                style={{width: 100}}
            >
                <PencilAltIcon className="button-icon"/>
            </Button>
            <Modal
                isOpen={modal}
                toggle={toggleModal}
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        Edit Recipe
                    </h5>
                    <button
                        className="btn-close"
                        onClick={toggleModal}
                    />
                </div>
                <ModalBody>
                    <Form id="recipe-form" onSubmit={handleSubmit}>
                        <FormGroup row className="mt-1">
                            <div className="modal-subheader">
                                <h5 className="modal-subtitle">
                                    Name
                                </h5>
                            </div>
                            <div className="recipe-row">
                                <Input 
                                        type="text"
                                        name="recipe-name"
                                        id="recipe-name"
                                        autoComplete="off"
                                        className="mb-2"
                                        required
                                        defaultValue={recipe.name}
                                        onChange={e => changeRecipeName(e.target.value)}
                                />
                            </div>
                            <div className="modal-subheader">
                                <h5 className="modal-subtitle">
                                    URL
                                </h5>
                            </div>
                            <div className="recipe-row">
                                <Input 
                                        type="text"
                                        name="recipe-url"
                                        id="recipe-url"
                                        autoComplete="off"
                                        className="mb-2"
                                        defaultValue={recipe.url}
                                        onChange={e => changeRecipeUrl(e.target.value)}
                                />
                            </div>
                            <div className="modal-subheader">
                                <h5 className="modal-subtitle">
                                    Ingredients
                                </h5>
                            </div>
                            {ingredientInputs}
                            <div>
                                <Button
                                    color="success"
                                    type="button"
                                    className="action-button mt-3"
                                    onClick={() => {changeIngredientCount(ingredientCount + 1)}}
                                >   
                                    <PlusCircleIcon className="button-icon"/>
                                    Add Ingredient
                                </Button>
                            </div>
                            <div>
                                <Button
                                    color="danger"
                                    type="button"
                                    className="action-button mt-3"
                                    onClick={() => {changeDeleteView(!deleteView)}}
                                >   
                                    <TrashIcon className="button-icon"/>
                                    {deleteView ? "Exit Delete View" : "Delete Ingredients"}
                                </Button>
                            </div>
                            <Button
                                color="dark"
                                className="mt-3"
                            >
                                Save Recipe
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    items: state.items,
    user: state.users.user,
    recipes: state.recipes.recipes
});

export default connect(mapStateToProps, { updateRecipe })(EditRecipeModal);