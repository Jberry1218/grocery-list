import React from "react";
import { connect } from "react-redux";
import ItemButtons from "./ItemButtons";
import ShoppingList from "./ShoppingList";

function GroceryList(props) {

    return (
        <div className={props.page === "grocery-list" ? "visible" : "hidden"}>
            <ItemButtons />
            <ShoppingList />
        </div>
    );
}

const mapStateToProps = (state) => ({
    page: state.page.page
});

export default connect(mapStateToProps, {})(GroceryList);