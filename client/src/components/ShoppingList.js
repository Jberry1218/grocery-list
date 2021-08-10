import React, { useEffect } from "react";
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
import { addItem, removeItem, fetchItems } from "../redux/slices/itemsSlice";


function ShoppingList() {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.items.items);
    const itemsStatus = useSelector(state => state.items.status)
    
    useEffect(() => {
        if (itemsStatus === 'idle') {
          dispatch(fetchItems());
        }
    }, [itemsStatus, dispatch])

    return (
        <Container>
            {
                categories.map(category => {
                    return (
                        <div>
                            <ListGroupItem className="category-header">{category._id.category}</ListGroupItem>
                            {
                                category.items.map(item => {
                                return ( 
                                    <ListGroup>
                                        <TransitionGroup className="grocery-list">
                                            <CSSTransition key={item.id} timeout={500} classNames="fade">
                                            <ListGroupItem>
                                                <Button
                                                    className="remove-btn px-1 py-0 me-2"
                                                    color="danger"
                                                    onClick={() => {
                                                        dispatch(removeItem(item.id));
                                                    }}
                                                    >
                                                        x
                                                    </Button>
                                                    <Button
                                                    className="add-btn px-1 py-0 me-2"
                                                    color="success"
                                                    onClick={() => {
                                                        dispatch(addItem(item.name));
                                                    }}
                                                    >
                                                        +
                                                    </Button>
                                                {item.name}
                                                </ListGroupItem>
                                            </CSSTransition>
                                        </TransitionGroup>
                                    </ListGroup>
                                )
                                })
                            }
                        </div>
                    )
                })
            }
        </Container>
    );
}

export default ShoppingList;