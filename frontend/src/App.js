import logo from "./logo.svg";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/shared/nav/Navbar";
import SubNav from "./components/shared/nav/SubNav";

//Pages Imports
import HomePage from "./pages/HomePage";
import IngredientPage from "./pages/ingredient/IngredientPage";
import RecipePage from "./pages/recipes/RecipesSearch";
import NotFound from "./pages/NotFound/NotFound";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Onboarding from "./pages/onboarding/Onboarding";
import RecipesSearch from "./pages/recipes/RecipesSearch";
import Recipe from "./pages/recipes/Recipe";

//Forum
import ForumPage from "./pages/forum/Forum";
import CreatePostPage from "./pages/forum/CreatePost";
import PostDetailPage from "./pages/forum/ForumPost";

import ShoppingList from "./pages/ShoppingList/ShoppingList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "register/onboarding",
      element: <Onboarding />,
    },
    {
      path: "ingredients",
      element: <IngredientPage />,
      children: [{ path: ":id" }],
    },
    {
      path: "ingredients/:id",
      element: <Recipe />,
      children: [{ path: ":id" }],
    },
    {
      path: "recipes",
      element: <RecipesSearch />,
    },
    {
      path: "recipes/:id",
      element: <Recipe />,
    },
    {
      path: "forum",
      element: <ForumPage />,
    },
    {
      path: "forum/create-post",
      element: <CreatePostPage />,
    },
    {
      path: "forum/:id",
      element: <PostDetailPage />,
    },
    { path: "shopping-list", element: <ShoppingList /> },
  ]);
  return (
    <main className="App">
      <Navbar />
      <SubNav />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
