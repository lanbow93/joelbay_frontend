import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import ErrorScreen from '../components/ErrorScreen'
import url from '../router/url'
import ListingCard from '../components/ListingCard'

function Listings() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [errorData, setErrorData] = useState({
        errorMessage: '',
        errorStatus: '',
        errorAdditional: '',
    })
    const [listingData, setListingData] = useState([])

    useEffect(() => {
        getListings()

        return () => {}
    }, [])

    const getListings = async () => {
        setIsLoading(true)
        if (listingData.length != 0) {
            setIsLoading(false)
            return
        }
        try {
            const response = await fetch(url + '/instruments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const listingInformation = await response.json()
                setListingData(listingInformation)
                setIsLoading(false)
            } else {
                const data = await response.json()
                const { error, message, status } = data
                setErrorData({
                    errorMessage: message,
                    errorAdditional: status,
                    errorStatus: error,
                })
                setIsModalActive(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="listings">
            <div className={`errorModal ${isModalActive ? 'showError' : ''}`}>
                <ErrorScreen
                    message={errorData.errorMessage}
                    status={errorData.errorStatus}
                    error={errorData.errorAdditional}
                    closeModal={setIsModalActive}
                />
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h1>Listings Page</h1>
                    <div className="listingDisplay">
                        {listingData.map((listing: any) => (
                            <ListingCard
                                {...listing}
                                key={listing.id + listing.name}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Listings
