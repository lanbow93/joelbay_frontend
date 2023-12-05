import { useParams } from 'react-router'

function SingleListing() {
    const { id } = useParams()
    console.log(id)
    return (
        <div className="singleListingPage">
            <h1>Single Listing</h1>
        </div>
    )
}

export default SingleListing
