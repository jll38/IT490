import logo from "./logo.svg";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/shared/nav/Navbar";
import SubNav from "./components/shared/nav/SubNav";

//Pages Imports
import HomePage from "./pages/HomePage";
import IngredientPage from "./pages/ingredient/IngredientPage";
import RecipePage from "./pages/recipe/RecipePage";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <main className="App">
      <Navbar />
      <SubNav/>
      <Switch>
        <Route path="/ingredient/:id" component={IngredientPage} />
        <Route path="/recipe/:id" component={RecipePage} />
        <Route path="/" component={HomePage} />
        
      </Switch>
    </main>
  );
}

export default App;
