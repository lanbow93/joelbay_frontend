import { Link } from 'react-router-dom'

interface ListingProps {
    brand: string
    category: string
    condition: string
    createdAt: Date
    description: string
    id: number
    imageUrls: [string]
    name: string
    price: string
    quantityAvailable: string,
    isAdmin: boolean
}
function ListingCard(props: ListingProps) {
    const {
        brand,
        category,
        // condition,
        // createdAt,
        description,
        id,
        imageUrls,
        name,
        price,
        quantityAvailable,
        isAdmin
    } = props
    return (
        <div className="listingCard">
            <div className="cardImage">
                <img src={imageUrls[0]} alt={name} className="product-image" />
            </div>
            <div className="product-details">
                <h3 className="product-name">{name}</h3>
                <p className="product-brand">
                    <span className="bold">Brand:</span> {brand}
                </p>
                <p className="product-category">
                    <span className="bold">Category:</span> {category}
                </p>
                {/* <p className="product-condition"><span className="bold">Condition:</span> {condition}</p> */}
                <p className="bold">Description:</p>
                <p className="product-description">{description}</p>
                <p className="product-price">
                    <span className="bold">Price: </span>${price}
                </p>
                <p className="product-quantity">
                    <span className="bold">Available:</span> {quantityAvailable}
                </p>
                <Link className="fullDetailsLink" to={ isAdmin ? `../admin/${id}?identity=${name}` : `${id}?identity=${name}`}>
                    full details
                </Link>
            </div>
        </div>
    )
}

export default ListingCard
