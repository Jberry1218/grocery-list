import React, { useState, useEffect } from "react";
import {
    Button, 
    Col,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { addItem } from "../../actions/itemsActions";

function RecipeSubmitModal(props) {

    const recipeList = props.recipes;
    let recipe;

    const itemsList = props.items.itemsList;
    const shoppingMode = props.items.shoppingMode;

    const [recipeName, changeRecipeName] = useState("");

    for (let i = 0; i < recipeList.length; i++) {
        if (recipeList[i].name === recipeName) {
            recipe = recipeList[i];
            break;
        }
    }

    const [ingredientCount, changeIngredientCount] = useState(0);
    const [ingredients, changeIngredients] = useState([]);
    const [deleteView, changeDeleteView] = useState(false);

    useEffect(() => {
        if (recipe !== undefined) {
            changeIngredientCount(recipe.ingredients.length);
            changeIngredients(recipe.ingredients);
        } else {
            changeIngredientCount(0);
            changeIngredients([]);
        }
    }, [recipeName]);

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
        for (let i = 0; i < ingredients.length; i++) {
            props.addItem({
                name: ingredients[i].name,
                category: ingredients[i].category.toLowerCase(),
                count: ingredients[i].count,
                userId: props.user._id
            });
        }
        document.getElementById("recipe-form").reset();
        changeRecipeName("");
        changeDeleteView(false);
        toggleModal();
    }

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            changeRecipeName("");
            changeDeleteView(false);
        }
    }

    return (
        <div>
            <Button
                color="warning"
                className={shoppingMode ? "action-button hidden" : "action-button visible mt-3"}
                onClick={toggleModal}
            >   
                <PlusCircleIcon className="button-icon me-1"/>
                Add From Recipe
            </Button>
            <Modal
                isOpen={modal}
                toggle={toggleModal}
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        Add Items From Recipe
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
                                    Choose Recipe
                                </h5>
                            </div>
                            <div className="recipe-row">
                                <Input 
                                    type="text"
                                    name="recipes"
                                    className="recipe-name"
                                    autoComplete="off"
                                    list="recipes"
                                    placeholder="Recipe"
                                    required
                                    onChange={e => {
                                        changeRecipeName(e.target.value);
                                    }} 
                                />
                                <datalist id="recipes">
                                    {recipeList.map(recipe => {
                                        return <option key={recipe._id}>{recipe.name[0].toUpperCase() + recipe.name.slice(1)}</option>
                                    })}
                                </datalist>
                            </div>
                            <div className={recipe ? "modal-subheader mt-2" : "hidden"}>
                                <h5 className="modal-subtitle">
                                    Ingredients
                                </h5>
                            </div>
                            {ingredientInputs}
                            <div>
                                <Button
                                    color="danger"
                                    type="button"
                                    className={recipe ? "action-button mt-3" : "hidden"}
                                    onClick={() => {changeDeleteView(!deleteView)}}
                                >   
                                    <TrashIcon className="button-icon me-1"/>
                                    {deleteView ? "Exit Delete View" : "Delete Ingredients"}
                                </Button>
                            </div>
                            <Button
                                color="dark"
                                className="mt-3"
                            >
                                Add Items
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

export default connect(mapStateToProps, { addItem })(RecipeSubmitModal);