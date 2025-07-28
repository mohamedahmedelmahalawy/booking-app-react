import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Login, Profile, Root, Signup } from "./pages/pages";
import { profileLoader } from "./firebase/firebaseConfig";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
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
