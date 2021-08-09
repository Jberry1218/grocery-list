import React, { useState } from "react";
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


function ShoppingList() {

    const [items, changeItems] = useState([
        { id: Math.random(), name: "Eggs" },
        { id: Math.random(), name: "Milk" },
        { id: Math.random(), name: "Steak" },
        { id: Math.random(), name: "Water" },
    ])

    return (
        <Container>
            <Button 
                color="dark" 
                className="mb-4" 
                onClick={() => {
                    const newName = prompt("Enter Item");
                    if (newName) {
                        changeItems([...items, { id: Math.random(), name: newName}])
                    }
                }}
            >
                Add Item
            </Button>
            <ListGroup>
                <TransitionGroup className="grocery-list">
                    {items.map(({id, name}) => (
                       <CSSTransition key={id} timeout={500} classNames="fade">
                           <ListGroupItem>
                               <Button
                                className="remove-btn px-1 py-0 me-2"
                                color="danger"
                                onClick={() => {
                                    changeItems(items.filter(item => item.id !== id))
                                }}
                                >
                                    x
                                </Button>
                                <Button
                                className="add-btn px-1 py-0 me-2"
                                color="success"
                                onClick={() => {
                                    changeItems([...items, { id: Math.random(), name: name}])
                                }}
                                >
                                    +
                                </Button>
                               {name}
                            </ListGroupItem>
                       </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
}

export default ShoppingList;