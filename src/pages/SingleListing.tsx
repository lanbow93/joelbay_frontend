// SingleListing.js

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { singleListingCall } from '../utils/apiCalls'
import Loading from '../components/Loading'
import ErrorScreen from '../components/ErrorScreen'
import { dateConverter } from '../utils/SharedFunctions'

function SingleListing() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [errorData, setErrorData] = useState({
        errorMessage: '',
        errorStatus: '',
        errorAdditional: '',
    })
    const [listingData, setListingData] = useState({
        brand: '',
        category: '',
        condition: '',
        createdAt: '',
        description: '',
        id: 0,
        imageUrl: '',
        name: '',
        price: '',
        quantityAvailable: 0,
        updatedAt: '',
    })

    const [transformValue, setTransformValue] = useState('scale(1)')

    const handleMouseMove = (event: React.MouseEvent) => {
        const { left, top, width, height } =
            event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - left) / width
        const y = (event.clientY - top) / height

        const scale = 2
        const offsetX = (scale - 1) * (0.5 - x);
        const offsetY = (scale - 1) * (0.5 - y);

        setTransformValue(
            `scale(${scale}) translate(${offsetX * 100}%, ${offsetY * 100}%)`
        )
    }

    const handleMouseLeave = () => {
        setTransformValue('scale(1)')
    }

    useEffect(() => {
        getSingleListing()
        return () => {}
    }, [])

    const getSingleListing = async () => {
        setIsLoading(true)
        const response = await singleListingCall(id || '0')
        setIsLoading(false)
        if (response.data) {
            setListingData(response.data[0])
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
    return (
        <div className="singleListingPage">
            <div className="singleListing">
                <div
                    className={`errorModal ${isModalActive ? 'showError' : ''}`}
                >
                    <ErrorScreen
                        message={errorData.errorMessage}
                        status={errorData.errorStatus}
                        error={errorData.errorAdditional}
                        closeModal={setIsModalActive}
                    />
                </div>
                <div className="listingHeader">
                    <h3>{listingData.name}</h3>
                </div>
                <div className="listingContent">
                    <div className="listingInfo">
                        <div
                            className="listingImage"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ overflow: 'hidden' }}
                        >
                            <img
                                src={listingData.imageUrl}
                                alt={`${listingData.name}`}
                                style={{ transform: transformValue }}
                            />
                            <p>**Hover to zoom**</p>
                        </div>
                        <div className="listingDetails">
                            <div>
                                <span>Brand:</span> {listingData.brand}
                            </div>
                            <div>
                                <span>Price: </span> ${listingData.price}
                            </div>
                            <div>
                                <span>Category:</span> {listingData.category}
                            </div>
                            <div>
                                <span>Condition:</span> {listingData.condition}
                            </div>

                            <div>
                                <span>Quantity Available: </span>
                                {listingData.quantityAvailable}
                            </div>
                            <div>
                                <span>Posted At : </span>{' '}
                                {dateConverter(listingData.updatedAt)}
                            </div>
                            <div className="listingDescription">
                                <span>Description: </span>{' '}
                                {listingData.description}
                            </div>
                        </div>
                        <div className="contactForm">
                            <form>
                                <label htmlFor="email">
                                    Your Email Address:
                                </label>
                                <input type="email" id="email" required />
                                <label htmlFor="message">Inquiry:</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                ></textarea>
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleListing
