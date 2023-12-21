import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import ErrorScreen from '../components/ErrorScreen'
import ListingCard from '../components/ListingCard'
import { listingCall } from '../utils/apiCalls'
import { uniqueObjectArrayList } from '../utils/SharedFunctions'

function AdminListings() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [errorData, setErrorData] = useState({
        errorMessage: '',
        errorStatus: '',
        errorAdditional: '',
    })
    const [listingData, setListingData] = useState([])
    type SelectedFilters = {
        category: string[]
        brand: string[]
        condition: string[]
    }

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        category: [] as string[],
        brand: [] as string[],
        condition: [] as string[],
    })

    useEffect(() => {
        getListings()
    }, [])

    const getListings = async () => {
        setIsLoading(true)
        const response = await listingCall()

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

    const handleCheckboxChange = (filterType: any, option: any) => {
        const updatedFilters: any = { ...selectedFilters }

        // Toggle the option in the selectedFilters state
        const index = updatedFilters[filterType].indexOf(option)
        if (index === -1) {
            updatedFilters[filterType].push(option)
        } else {
            updatedFilters[filterType].splice(index, 1)
        }

        // Update the state with the new selectedFilters
        setSelectedFilters(updatedFilters)
    }
    if (isLoading) {
        return <Loading />
    }

    const filteredListings = listingData.filter((listing: any) => {
        // Check if the listing matches the selected filters
        const categoryFilter =
            selectedFilters.category.length === 0 ||
            selectedFilters.category.includes(listing.category)
        const brandFilter =
            selectedFilters.brand.length === 0 ||
            selectedFilters.brand.includes(listing.brand)
        const conditionFilter =
            selectedFilters.condition.length === 0 ||
            selectedFilters.condition.includes(listing.condition)

        // Return true if all filters pass
        return categoryFilter && brandFilter && conditionFilter
    })

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
            <h1>Admin Page</h1>
            <div className="filter">
                <h2>Filter Options</h2>
                <p className="bold underline">Category</p>
                <ul className="filterOptions">
                    {uniqueObjectArrayList(listingData, 'category').map(
                        (option: string) => (
                            <li key={option}>
                                <input
                                    type="checkbox"
                                    name={option}
                                    id={option}
                                    checked={selectedFilters.category.includes(
                                        option
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange('category', option)
                                    }
                                />
                                <label htmlFor={option}>{option}</label>
                            </li>
                        )
                    )}
                </ul>
                <p className="bold underline">Brand</p>
                <ul className="filterOptions">
                    {uniqueObjectArrayList(listingData, 'brand').map(
                        (option: string) => (
                            <li key={option}>
                                <input
                                    type="checkbox"
                                    name={option}
                                    id={option}
                                    checked={selectedFilters.brand.includes(
                                        option
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange('brand', option)
                                    }
                                />
                                <label htmlFor={option}>{option}</label>
                            </li>
                        )
                    )}
                </ul>
                <p className="bold underline">Condition</p>
                <ul className="filterOptions">
                    {uniqueObjectArrayList(listingData, 'condition').map(
                        (option: string) => (
                            <li key={option}>
                                <input
                                    type="checkbox"
                                    name={option}
                                    id={option}
                                    checked={selectedFilters.condition.includes(
                                        option
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange(
                                            'condition',
                                            option
                                        )
                                    }
                                />
                                <label htmlFor={option}>{option}</label>
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className="listingDisplay">
                {filteredListings.map((listing: any) => (
                    <ListingCard {...listing} isAdmin={true} key={listing.id + listing.name} />
                ))}
            </div>
        </div>
    )
}

export default AdminListings
