import AppNavbar from "./components/AppNavbar";
import ActionButtons from "./components/ActionButtons";
import ShoppingList from "./components/ShoppingList";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container >
          <ActionButtons />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
