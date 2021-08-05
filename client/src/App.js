import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


function App() {
  return (
    <div className="App">
      <AppNavbar />
      <h1>Hello</h1>
      <ShoppingList />
    </div>
  );
}

export default App;
