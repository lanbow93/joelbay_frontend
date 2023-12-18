import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import ErrorScreen from '../components/ErrorScreen'
import ListingCard from '../components/ListingCard'
import { listingCall } from '../utils/apiCalls'
import { uniqueObjectArrayList } from '../utils/SharedFunctions'

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
        const response: any = await listingCall()
        
        setIsLoading(false)
        if (response.data) {
            setListingData(response.data)
        } else {
            const { status, message, error } = response.error
            setErrorData({
                errorStatus: status,
                errorMessage: message,
                errorAdditional: error,
            })
            setIsModalActive(true)
        }
    }

    if (isLoading) {
        return <Loading />
    }
    console.log(uniqueObjectArrayList(listingData, "category"))
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
            <h1>Listings Page</h1>
            <div className="filter">
                <h2>Filter Options</h2>
                <p>Category</p>
                {uniqueObjectArrayList(listingData, "category").map((option: string) => <><input type="checkbox" name={option} id={option}/><label htmlFor={option}>{option}</label></>)}
                <p>Brand</p>
                {uniqueObjectArrayList(listingData, "brand").map((option: string) => <><input type="checkbox" name={option} id={option}/><label htmlFor={option}>{option}</label></>)}
                <p>Condition</p>
                {uniqueObjectArrayList(listingData, "condition").map((option: string) => <><input type="checkbox" name={option} id={option}/><label htmlFor={option}>{option}</label></>)}
            </div>
            <div className="listingDisplay">
                {listingData.map((listing: any) => (
                    <ListingCard {...listing} key={listing.id + listing.name} />
                ))}
            </div>
        </div>
    )
}

export default Listings
