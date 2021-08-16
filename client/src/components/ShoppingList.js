import React, { useEffect } from "react";
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 
import { getItems, updateItem, deleteItem, foundItem, resetFoundItems } from "../actions/itemsActions";



function ShoppingList(props) {
    
    useEffect(() => {
        props.getItems();
    }, []);

    const itemsList = props.itemsList.itemsList;
    const shoppingMode = props.itemsList.shoppingMode;

    return (
        <Container className="mb-5">
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
                                                                props.updateItem({
                                                                    id: item.id,
                                                                    count: 1
                                                                });
                                                            }}
                                                            >
                                                                +
                                                        </Button>
                                                        <Button
                                                            className="increment-buttons"
                                                            color="warning"
                                                            onClick={() => {
                                                                props.updateItem({
                                                                    id: item.id,
                                                                    count: -1
                                                                });
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
                                                        props.foundItem({
                                                            id: item.id,
                                                            found: item.found
                                                        });
                                                    }}
                                                    className={shoppingMode ? "found-rem visible" : "found-rem hidden"}
                                                    >
                                                        X
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    onClick={() => {
                                                        props.deleteItem({
                                                            id: item.id,
                                                            name: item.name,
                                                            category: item.category
                                                        });
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

ShoppingList.propTypes = {
    itemsList: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    foundItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    itemsList: state.itemsList
});

export default connect(mapStateToProps, {
    getItems,
    updateItem,
    deleteItem, 
    foundItem
})(ShoppingList);