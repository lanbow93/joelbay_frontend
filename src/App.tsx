import './app.scss'
import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
    return (
        <div className="App">
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    )
}

export default App
