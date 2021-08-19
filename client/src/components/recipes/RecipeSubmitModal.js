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
import { PlusCircleIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { addRecipe } from "../../actions/recipesActions";

function RecipeSubmitModal(props) {

    const itemsList = props.items.itemsList;

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        changeIngredientCount(1);
        setModal(!modal);
    }

    const [recipeName, changeRecipeName] = useState("");
    const [ingredientCount, changeIngredientCount] = useState(1);

    let ingredientInputs = [];

    for (let i = 0; i < ingredientCount; i++) {
        ingredientInputs.push(
            <div className="recipe-row">
                <Col xs={5} md={5} className="mb-2">
                    <Input 
                        type="text"
                        name="name"
                        className="ingredient-name"
                        autoComplete="off"
                        placeholder="Name"
                    />
                </Col>
                <Col xs={5} md={5} className="mb-2">
                    <Input 
                        type="text"
                        name="category"
                        className="ingredient-category"
                        autoComplete="off"
                        placeholder="Category"
                        list="categories"
                    />
                    <datalist id="categories">
                        {itemsList.map(category => {
                            return <option key={category._id}>{category._id[0].toUpperCase() + category._id.slice(1)}</option>
                        })}
                    </datalist>
                </Col>
                <Col xs={2} md={2} className="mb-2">
                    <Input 
                        type="number"
                        name="count"
                        className="ingredient-count"
                        placeholder="Count"
                        autoComplete="off"
                    />
                </Col>
            </div>
        )
    }

    useEffect(() => {
        ingredientInputs.push(
            <div className="recipe-row">
                <Col xs={5} md={5} className="mb-2">
                    <Input 
                        type="text"
                        name="name"
                        className="ingredient-name"
                        autoComplete="off"
                        placeholder="Name"
                    />
                </Col>
                <Col xs={5} md={5} className="mb-2">
                    <Input 
                        type="text"
                        name="category"
                        className="ingredient-category"
                        autoComplete="off"
                        placeholder="Category"
                        list="categories"
                    />
                    <datalist id="categories">
                        {itemsList.map(category => {
                            return <option key={category._id}>{category._id[0].toUpperCase() + category._id.slice(1)}</option>
                        })}
                    </datalist>
                </Col>
                <Col xs={2} md={2} className="mb-2">
                    <Input 
                        type="number"
                        name="count"
                        className="ingredient-count"
                        placeholder="Count"
                        autoComplete="off"
                    />
                </Col>
            </div>
        )
    }, [ingredientCount]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let ingredientNames = document.getElementsByClassName("ingredient-name");
        let ingredientCategories = document.getElementsByClassName("ingredient-category");
        let ingredientCounts = document.getElementsByClassName("ingredient-count");
        let ingredients = [];

        // Create ingredients array
        for (let i = 0; i < ingredientCount; i++) {
            ingredients.push({
                name: ingredientNames[i].value,
                category: ingredientCategories[i].value,
                count: ingredientCounts[i].value,
            })
        }

        props.addRecipe({
            name: recipeName,
            userId: props.user._id,
            ingredients: ingredients
        });
        document.getElementById("recipe-form").reset();
        changeIngredientCount(1);
        toggleModal();
    }

    return (
        <div>
            <Button
                color="dark"
                className="action-button mt-3"
                onClick={toggleModal}
            >   
                <PlusCircleIcon className="button-icon me-2"/>
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
                                    Ingredients
                                </h5>
                            </div>
                            {ingredientInputs}
                            <div>
                                <Button
                                    color="success"
                                    type="button"
                                    className="action-button add-ingredient mt-3"
                                    onClick={() => {changeIngredientCount(ingredientCount + 1)}}
                                >   
                                    <PlusCircleIcon className="button-icon"/>
                                    Add Ingredient
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
    user: state.users.user
});

export default connect(mapStateToProps, { addRecipe })(RecipeSubmitModal);