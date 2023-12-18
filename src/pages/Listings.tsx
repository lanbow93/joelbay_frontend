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
                <p className='bold underline'>Category</p>
                <ul className="filterOptions">{uniqueObjectArrayList(listingData, "category").map((option: string) => <li><input type="checkbox" name={option} id={option}/><label htmlFor={option}>{option}</label></ li>)}</ul>
                <p className='bold underline'>Brand</p>
                <ul className="filterOptions">{uniqueObjectArrayList(listingData, "brand").map((option: string) => <li><input type="checkbox" name={option} id={option}/><label htmlFor={option}>{option}</label></ li>)}</ul>
                <p className='bold underline'>Condition</p>
                <ul className="filterOptions">{uniqueObjectArrayList(listingData, "condition").map((option: string) => <li><input type="checkbox" name={option} id={option}/><label htmlFor={option}>{option}</label></ li>)}</ul>
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
