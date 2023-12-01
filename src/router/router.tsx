import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Homepage from "../pages/Homepage";
import AdminLogin from "../pages/AdminLogin";
import EditMenu from "../pages/EditMenu";
import Listings from "../pages/Listings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Homepage />} />
      <Route path="/sitemaster" element={<AdminLogin />} />
      <Route path="/editmenu" element={<EditMenu />}/>
      <Route path="/listings" element={<Listings />}/>
    </Route>
  )
);

export default router;
