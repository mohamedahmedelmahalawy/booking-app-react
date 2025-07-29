import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home, Login, Profile, Root, Signup } from "./pages/pages";
import { profileLoader } from "./firebase/firebaseConfig";

import { HydrateFallback } from "./pages/home/Home";
import homeLoader from "./loaders/HomeLoader";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
        hydrateFallbackElement: <HydrateFallback />,
      },
      {
        path: "profile",
        Component: Profile,
        loader: profileLoader,
      },
    ],
  },
  {
    path: "signup",
    Component: Signup,
  },
  {
    path: "login",
    Component: Login,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
