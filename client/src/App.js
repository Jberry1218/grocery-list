import React, { useEffect } from "react";
import AppNavbar from "./components/AppNavbar";
import GroceryList from "./components/grocerylist/GroceryList";
import Recipes from "./components/recipes/Recipes";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/usersActions";
import { getPage } from "./actions/pageActions";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getPage("grocery-list"));
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <GroceryList />
        <Recipes />
      </div>
    </Provider>
  );
}

export default App;
