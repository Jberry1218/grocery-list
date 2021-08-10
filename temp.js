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
            <ListGroup>
                <TransitionGroup className="grocery-list">
                    {categories.map(category => (
                        <h5>{category}hi</h5>,
                        category.items.map(item => (
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
                               {item}
                            </ListGroupItem>
                       </CSSTransition>
                       ))
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
}

export default ShoppingList;


// @route   GET api/items
// @desc    Get all items
router.get("/", (req, res) => {
    let pipeline = [
        {  $group: { _id: { category: "$category" }, items: { $push: "$name" } } }
    ];
    Item.aggregate(pipeline)
        .then(items => res.json(items));
});