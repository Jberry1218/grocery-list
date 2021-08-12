import React, { useEffect } from "react";
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, updateItem, deleteItem, foundItem, foundReset } from "../redux/slices/itemsSlice";


function ShoppingList() {

    const dispatch = useDispatch();
    const itemsList = useSelector(state => state.itemsList.itemsList);
    const shoppingMode = useSelector(state => state.itemsList.shoppingMode);
    const itemsStatus = useSelector(state => state.itemsList.status);
    
    useEffect(() => {
        if (itemsStatus === 'idle') {
          dispatch(fetchItems());
        }
    }, [itemsStatus, dispatch])

    return (
        <Container className="mb-5">
            <Button 
                onClick={() => dispatch(foundReset())}
                className={shoppingMode ? "hidden" : "visible"}
            >
                Reset Found
            </Button>
            {itemsList.map(category => {
                    return (
                        <div className="container">
                            <div className="row">
                            <ListGroupItem key={category._id} color="dark" className="category-header col-12 mt-3 mb-1">{category._id.toUpperCase()}</ListGroupItem>
                            {
                                category.items.map(item => {
                                return ( 
                                    <ListGroup 
                                        key={item.id} 
                                        className="col-12 col-lg-6 p-0"
                                    >
                                        <ListGroupItem 
                                            className={item.found ? "found" : "not-found"}
                                        >
                                            <div className="item-container">
                                                <div className="incremenent-buttons-counter">
                                                    <div className="increment-buttons-container">
                                                        <Button
                                                            className="increment-buttons"
                                                            color="success"
                                                            onClick={() => {
                                                                dispatch(updateItem({
                                                                    id: item.id,
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
                                                                    id: item.id,
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
                                                {item.name[0].toUpperCase() + item.name.slice(1)}
                                                <Button
                                                    color="secondary"
                                                    onClick={() => {
                                                        dispatch(foundItem({
                                                            id: item.id,
                                                            found: item.found
                                                        }));
                                                    }}
                                                    className={shoppingMode ? "found-rem visible" : "found-rem hidden"}
                                                    >
                                                        X
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    onClick={() => {
                                                        dispatch(deleteItem({
                                                            id: item.id,
                                                            name: item.name,
                                                            category: item.category
                                                        }));
                                                    }}
                                                    className={shoppingMode ? "found-rem hidden" : "found-rem visible"}
                                                    >
                                                        X
                                                </Button>
                                            </div>
                                            </ListGroupItem>
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