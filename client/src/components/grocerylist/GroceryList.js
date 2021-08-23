import React from "react";
import { connect } from "react-redux";
import ItemButtons from "./ItemButtons";
import ShoppingList from "./ShoppingList";

function GroceryList(props) {

    return (
        <div>
            <ItemButtons />
            <ShoppingList />
        </div>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(GroceryList);