import loadingImage from '../assets/loading.gif'
function LoadingScreen() {
    return (
        <div className="loadingScreen">
            <img src={loadingImage} alt="" />
            <h1>Loading...</h1>
        </div>
    )
}

export default LoadingScreen