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
import { updateItem, fetchItems } from "../redux/slices/itemsSlice";


function ShoppingList() {

    const dispatch = useDispatch();
    const itemsList = useSelector(state => state.itemsList.itemsList);
    const itemsStatus = useSelector(state => state.itemsList.status);
    
    useEffect(() => {
        if (itemsStatus === 'idle') {
          dispatch(fetchItems());
        }
    }, [itemsStatus, dispatch])

    return (
        <Container className="mb-5">
            {
                itemsList.map(category => {
                    return (
                        <div className="container">
                            <div className="row">
                            <ListGroupItem color="dark" className="category-header col-12">{category._id}</ListGroupItem>
                            {
                                category.items.map(item => {
                                return ( 
                                    <ListGroup className="col-12 col-lg-6 p-0">
                                        <TransitionGroup className="grocery-list">
                                            <CSSTransition key={item.id} timeout={500} classNames="fade">
                                            <ListGroupItem>
                                                <div className="item-container">
                                                    <div className="incremenent-buttons-counter">
                                                        <div className="increment-buttons-container">
                                                            <Button
                                                                className="increment-buttons"
                                                                color="success"
                                                                onClick={() => {
                                                                    dispatch(updateItem({
                                                                        name: item.name,
                                                                        category: item.category,
                                                                        count: 1
                                                                    }));
                                                                }}
                                                                >
                                                                    +
                                                            </Button>
                                                            <Button
                                                                className="increment-buttons"
                                                                color="warning"
                                                                onClick={() => {
                                                                    dispatch(updateItem({
                                                                        name: item.name,
                                                                        category: item.category,
                                                                        count: -1
                                                                    }));
                                                                }}
                                                                >
                                                                    -
                                                            </Button>
                                                        </div>
                                                        <div className="item-count">
                                                            {item.count}
                                                        </div>
                                                    </div>
                                                    {item.name}
                                                    <Button
                                                        className="remove-btn"
                                                        color="danger"
                                                        >
                                                            X
                                                    </Button>
                                                </div>
                                                </ListGroupItem>
                                            </CSSTransition>
                                        </TransitionGroup>
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

export default ShoppingList;