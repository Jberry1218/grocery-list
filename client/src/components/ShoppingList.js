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
                className="md-2" 
                onClick={() => {
                    const newName = prompt("Enter Item");
                    if (newName) {
                        changeItems([...items, { id: Math.random(), name: newName}])
                    }
                }}
            >
                Add Item
            </Button>
        </Container>
    );
}

export default ShoppingList