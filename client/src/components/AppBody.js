import { React } from "react";
import { connect } from "react-redux";
import Welcome from "./authentication/Welcome";
import GroceryList from "./grocerylist/GroceryList";
import Recipes from "./recipes/Recipes";

function AppBody(props) {

    const renderPage = () => {
        if (props.page === "welcome") {
            return <Welcome />
        } else if (props.page === "grocery-list") {
            return <GroceryList />;
        } else if (props.page === "recipes") {
            return <Recipes />
        }
    }

    return (
        <div>
            {renderPage()}
        </div>
    );
}

const mapStateToProps = (state) => ({
    page: state.page.page
});

export default connect(mapStateToProps, {})(AppBody);