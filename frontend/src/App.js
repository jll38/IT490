import logo from "./logo.svg";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/shared/nav/Navbar";
import SubNav from "./components/shared/nav/SubNav";

import { RouteGuard } from "./RouteGuard";

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
import SettingsPage from "./pages/user/SettingsPage";

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
      element: (
        <RouteGuard>
          <Onboarding />
        </RouteGuard>
      ),
    },
    {
      path: "recipes",
      element: (
        <RouteGuard>
          <RecipesSearch />
        </RouteGuard>
      ),
    },
    {
      path: "recipes/:id",
      element: (
        <RouteGuard>
          <Recipe />
        </RouteGuard>
      ),
    },
    {
      path: "forum",
      element: (
        <RouteGuard>
          <ForumPage />
        </RouteGuard>
      ),
    },
    {
      path: "forum/create-post",
      element: (
        <RouteGuard>
          <CreatePostPage />
        </RouteGuard>
      ),
    },
    {
      path: "forum/:id",
      element: (
        <RouteGuard>
          <PostDetailPage />
        </RouteGuard>
      ),
    },
    {
      path: "shopping-list",
      element: (
        <RouteGuard>
          <ShoppingList />
        </RouteGuard>
      ),
    },
    {
      path: "settings",
      element: (
        <RouteGuard>
          <SettingsPage />
        </RouteGuard>
      ),
    },
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
