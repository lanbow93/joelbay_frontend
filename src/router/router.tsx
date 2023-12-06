import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'
import App from '../App'
import Homepage from '../pages/Homepage'
import AdminLogin from '../pages/AdminLogin'
import CreateMenu from '../pages/CreateMenu'
import Listings from '../pages/Listings'
import Instrument from '../pages/SingleListing'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/sitemaster" element={<AdminLogin />} />
            <Route path="/createMenu" element={<CreateMenu />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<Instrument />} />
        </Route>
    )
)

export default router
