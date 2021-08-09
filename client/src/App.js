import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemSubmitModal from "./components/ItemSubmitModal";
import { Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemSubmitModal />
        <ShoppingList />
      </Container>
    </div>
  );
}

export default App;
