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
import { useDispatch } from "react-redux";
/*import { addItem } from "../redux/slices/itemsSlice";*/

function ItemSubmitModal() {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [nameInput, changeNameInput] = useState("");
    const [categoryInput, changeCategoryInput] = useState("");
    const [countInput, changeCountInput] = useState("");

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        /*dispatch(addItem({
            name: nameInput,
            category: categoryInput,
            count: countInput
        }));*/
        toggle();
    }

    return (
        <div>
            <Button
                color="dark"
                className="mb-3"
                onClick={toggle}
            >
                Add New Item
            </Button>
            <Modal
                isOpen={modal}
                toggle={toggle}
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        Add To Grocery List
                    </h5>
                    <button
                        className="btn-close"
                        onClick={toggle}
                    />
                </div>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row className="mt-1">
                            <Label for="name" sm={2}>Name:</Label>
                            <Col sm={10}>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Bananas, Apples, ..."
                                    onChange={e => changeNameInput(e.target.value)}
                                />
                            </Col>
                            <Label for="category" sm={2}>Category:</Label>
                            <Col sm={10}>
                                <Input 
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Produce, Frozen Foods, ..."
                                    onChange={e => changeCategoryInput(e.target.value)}
                                />
                            </Col>
                            <Label for="count" sm={2}>Count:</Label>
                            <Col sm={10}>
                                <Input 
                                    type="number"
                                    name="count"
                                    id="count"
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

export default ItemSubmitModal;