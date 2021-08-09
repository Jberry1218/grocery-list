import React, { useState } from "react";
import {
    Button, 
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { useDispatch } from "react-redux";
import { add } from "../redux/slices/itemsSlice";

function ItemSubmitModal() {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [itemInput, changeItemInput] = useState("");

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(add(itemInput));
        toggle();
    }

    return (
        <div>
            <Button
                color="dark"
                className="mb-2"
                onClick={toggle}
            >
                Add Item
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
                            <Label for="item" sm={2}>Item:</Label>
                            <Col sm={10}>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="ex: Bananas, Apples, etc."
                                    onChange={e => changeItemInput(e.target.value)}
                                />
                            </Col>
                            <Button
                                color="secondary"
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