import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  Details,
  Home,
  Login,
  Profile,
  Root,
  Search,
  Signup,
  Payment,
  MyBookings,
} from "./pages/pages";
import { HydrateFallback } from "./pages/home/Home";
import SearchFallback from "./pages/Search/SearchFallback";
import homeLoader from "./loaders/homeloaders/HomeLoader";
import HomeError from "./pages/home/HomeError";
import searchLoader from "./loaders/searchloaders/searchLoaders";
import SearchError from "./pages/Search/SearchError";
import detailsPageLoader from "./loaders/detailsloader/detailsPageLoader";
import PrivateRoute from "./components/PrivateRoute";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
        errorElement: <HomeError />,
        hydrateFallbackElement: <HydrateFallback />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "search",
        Component: Search,
        loader: searchLoader,
        errorElement: <SearchError />,
        hydrateFallbackElement: <SearchFallback />,
      },
      {
        path: "/:id",
        Component: Details,
        loader: detailsPageLoader,
        hydrateFallbackElement: <SearchFallback />,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <SearchFallback />,
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
