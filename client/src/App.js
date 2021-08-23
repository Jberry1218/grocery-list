import React, { useEffect } from "react";
import AppBody from "./components/AppBody";
import AppNavbar from "./components/AppNavbar";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/usersActions";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [store.getState().user]);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <AppBody />
      </div>
    </Provider>
  );
}

export default App;
