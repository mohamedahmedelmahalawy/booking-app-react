import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Root, Signup } from "./pages/pages";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
