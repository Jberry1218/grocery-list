import React, { useState } from "react";
import {
    Button, 
    Col,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 
import { addItem } from "../actions/itemsActions";

function ItemSubmitModal(props) {

    const itemsList = props.itemsList.itemsList;
    const shoppingMode = props.itemsList.shoppingMode;

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    }

    const [nameInput, changeNameInput] = useState("");
    const [categoryInput, changeCategoryInput] = useState("");
    const [countInput, changeCountInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addItem({
            name: nameInput,
            category: categoryInput.toLowerCase(),
            count: countInput
        });
        document.getElementById("item-form").reset();
    }

    return (
        <div>
            <Button
                color="dark"
                className={shoppingMode ? "action-button hidden" : "action-button visible"}
                onClick={toggleModal}
            >
                <PlusCircleIcon className="button-icon"/>
                Add New Item
            </Button>
            <Modal
                isOpen={modal}
                toggle={toggleModal}
                animation={false}
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        Add To Grocery List
                    </h5>
                    <button
                        className="btn-close"
                        onClick={toggleModal}
                    />
                </div>
                <ModalBody>
                    <Form id="item-form" onSubmit={handleSubmit}>
                        <FormGroup row className="mt-1">
                            <Label for="name" sm={2}>Name:</Label>
                            <Col sm={10}>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    autocomplete="off"
                                    required
                                    onChange={e => changeNameInput(e.target.value)}
                                />
                            </Col>
                            <Label for="category" sm={2}>Category:</Label>
                            <Col sm={10}>
                                <Input 
                                    type="text"
                                    name="category"
                                    id="category"
                                    autocomplete="off"
                                    list="categories"
                                    required
                                    onChange={e => changeCategoryInput(e.target.value)}
                                />
                                <datalist id="categories">
                                    {itemsList.map(category => {
                                        return <option key={category._id}>{category._id[0].toUpperCase() + category._id.slice(1)}</option>
                                    })}
                                </datalist>
                            </Col>
                            <Label for="count" sm={2}>Count:</Label>
                            <Col sm={10}>
                                <Input 
                                    type="number"
                                    name="count"
                                    id="count"
                                    autocomplete="off"
                                    required
                                    onChange={e => changeCountInput(e.target.value)}
                                />
                            </Col>
                            <Button
                                color="dark"
                                className="mt-3"
                            >
                                Add Item
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

ItemSubmitModal.propTypes = {
    itemsList: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    itemsList: state.itemsList
});

export default connect(mapStateToProps, { addItem })(ItemSubmitModal);