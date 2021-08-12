import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import { Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container >
        <ShoppingList />
      </Container>
    </div>
  );
}

export default App;
