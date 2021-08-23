import React, { useState } from "react";
import {
    Button, 
    Col,
    Container,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { addRecipe } from "../../actions/recipesActions";

function RecipeSubmitModal(props) {

    const itemsList = props.items.itemsList;

    const [recipeName, changeRecipeName] = useState("");
    const [recipeUrl, changeRecipeUrl] = useState("");
    const [ingredientCount, changeIngredientCount] = useState(1);
    const [ingredients, changeIngredients] = useState([]);
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
                            className="ingredient-count"
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
        props.addRecipe({
            name: recipeName,
            url: recipeUrl,
            userId: props.user._id,
            ingredients: ingredients
        });
        document.getElementById("recipe-form").reset();
        changeIngredientCount(1);
        toggleModal();
    }

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        changeIngredientCount(1);
        changeRecipeName("");
        changeRecipeUrl("");
        changeIngredients([]);
        changeDeleteView(false);
        setModal(!modal);
    }

    return (
        <Container className="action-button-container">
        <div>
            <Button
                color="dark"
                className="action-button mt-3"
                onClick={toggleModal}
            >   
                <PlusCircleIcon className="button-icon"/>
                Add New Recipe
            </Button>
            <Modal
                isOpen={modal}
                toggle={toggleModal}
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        Add Recipe
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
        </Container>
    )
}

const mapStateToProps = (state) => ({
    items: state.items,
    user: state.users.user
});

export default connect(mapStateToProps, { addRecipe })(RecipeSubmitModal);