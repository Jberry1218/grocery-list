import React from "react";
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";
import { 
    CSSTransition,
    TransitionGroup
} from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/slices/itemsSlice";


function ShoppingList() {

    const items = useSelector((state) => state.items);
    const dispatch = useDispatch();

    return (
        <Container>
            <ListGroup>
                <TransitionGroup className="grocery-list">
                    {items.map(item => (
                       <CSSTransition key={item.id} timeout={500} classNames="fade">
                           <ListGroupItem>
                               <Button
                                className="remove-btn px-1 py-0 me-2"
                                color="danger"
                                onClick={() => {
                                    dispatch(remove(item.id));
                                }}
                                >
                                    x
                                </Button>
                                <Button
                                className="add-btn px-1 py-0 me-2"
                                color="success"
                                onClick={() => {
                                    dispatch(add(item.name));
                                }}
                                >
                                    +
                                </Button>
                               {item.name}
                            </ListGroupItem>
                       </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
}

export default ShoppingList;