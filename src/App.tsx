import './app.scss'
import sitePreview from './assets/Joelbay.png'
import { Outlet } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { Helmet } from 'react-helmet'

function App() {
    return (
        <div className="App">
            <Helmet>
                <title>Joelbay Collections</title>
                <meta
                    name="description"
                    content="A catalog of items available for sale with a contact form for each listing. Joelbay Collections is a demonstration of skills in designing and implementing a backend system for an e-commerce platform."
                />
                <meta property="og:title" content="Joelbay Collections" />
                <meta
                    property="og:description"
                    content="A catalog of items available for sale with a contact form for each listing. Joelbay Collections is a demonstration of skills in designing and implementing a backend system for an e-commerce platform."
                />
                <meta property="og:image" content={sitePreview} />
            </Helmet>
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    )
}

export default App
