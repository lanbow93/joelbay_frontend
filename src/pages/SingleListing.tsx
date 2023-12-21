import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { emailSubmission, singleListingCall } from '../utils/apiCalls'
import Loading from '../components/Loading'
import ErrorScreen from '../components/ErrorScreen'
import { dateConverter } from '../utils/SharedFunctions'

function SingleListing() {
    const navigate = useNavigate()
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
        imageUrls: [],
        name: '',
        price: '',
        quantityAvailable: 0,
        updatedAt: '',
    })

    const [emailForm, setEmailForm] = useState({
        imageUrl: '',
        itemName: '',
        link: window.location.href,
        name: '',
        email: '',
        message: '',
    })
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const [transformValue, setTransformValue] = useState('scale(1)')
    const handleMouseMove = (event: React.MouseEvent) => {
        const { left, top, width, height } =
            event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - left) / width
        const y = (event.clientY - top) / height

        const scale = 2
        const offsetX = (scale - 1) * (0.5 - x)
        const offsetY = (scale - 1) * (0.5 - y)

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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setEmailForm({ ...emailForm, [name]: value })
    }

    const handleFormSubmission = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        setIsLoading(true)
        const emailResponse = await emailSubmission(JSON.stringify(emailForm))
        setIsLoading(false)
        if (emailResponse.data) {
        } else {
            const { status, message, error } = emailResponse.error
            setErrorData({
                errorStatus: status,
                errorMessage: message,
                errorAdditional: error,
                
            })
            setIsModalActive(true)
        }
    }

    const getSingleListing = async () => {
        setIsLoading(true)
        const response = await singleListingCall(id || '0')
        setIsLoading(false)
        if (response.data) {
            setListingData(response.data[0])
            setEmailForm({
                ...emailForm,
                imageUrl: listingData.imageUrls[0],
                itemName: listingData.name,
            })
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
            <div className="backSection">
                <button className="backButton" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
            <div className="singleListing">
                <div
                    className={`errorModal ${isModalActive ? 'showError' : ''}`}
                >
                    <ErrorScreen
                        message={errorData.errorMessage}
                        status={errorData.errorStatus}
                        error={errorData.errorAdditional}
                        closeModal={setIsModalActive}
                        confirmNeeded={false}
                        confirmFunction={console.log}
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
                                src={listingData.imageUrls[currentImageIndex]}
                                alt={`${listingData.name}`}
                                style={{ transform: transformValue }}
                            />
                            <div className="imagePageIcon">
                                {listingData.imageUrls.map((url, index) =>
                                    index === currentImageIndex ? (
                                        <p key={url}>•</p>
                                    ) : (
                                        <p key={url}>◦</p>
                                    )
                                )}
                            </div>
                            <div className="imageControl">
                                <button
                                    className={
                                        currentImageIndex === 0 ? 'hidden' : ''
                                    }
                                    onClick={() =>
                                        setCurrentImageIndex(
                                            currentImageIndex - 1
                                        )
                                    }
                                >
                                    ←
                                </button>
                                <button
                                    className={
                                        currentImageIndex ===
                                        listingData.imageUrls.length - 1
                                            ? 'hidden'
                                            : ''
                                    }
                                    onClick={() =>
                                        setCurrentImageIndex(
                                            currentImageIndex + 1
                                        )
                                    }
                                >
                                    →
                                </button>
                            </div>
                            <p className="hoverMessage">**Hover to zoom**</p>
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
                            <form onSubmit={handleFormSubmission}>
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={handleInputChange}
                                    value={emailForm.name}
                                    required
                                />
                                <label htmlFor="email">Email Address:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={emailForm.email}
                                    required
                                />
                                <label htmlFor="message">Inquiry:</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    onChange={(event) =>
                                        setEmailForm({
                                            ...emailForm,
                                            message: event.target.value,
                                        })
                                    }
                                    name="message"
                                    value={emailForm.message}
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
