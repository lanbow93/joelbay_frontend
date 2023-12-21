import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { singleListingCall, updateListing } from '../utils/apiCalls'
import Loading from '../components/Loading'
import ErrorScreen from '../components/ErrorScreen'

function AdminSingleListing() {
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
        images: null as File[] | null,
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
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target
        setListingData({ ...listingData, [name]: value })
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files.length > 0) {
            const fileList = Array.from(files)
            setListingData((prevData) => ({ ...prevData, images: fileList }))
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

    const handleSubmission = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData()

        // Append form data
        Object.entries(listingData).forEach(([key, value]: any) => {
            if (key === 'images') {
                if (value === null) {
                    return
                }
                value.forEach((file: File, index: number) => {
                    formData.append(`${key}[${index}]`, file)
                })
            } else {
                formData.append(key, value)
            }
        })
        const response = await updateListing(formData, listingData.id)
        setIsLoading(false)
        if (response.data) {
            console.log(response.data)
            setErrorData({
                errorStatus: 'Success',
                errorMessage: 'Successfully Updated',
                errorAdditional: 'Success',
            })
            setIsModalActive(true)
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
                        <form
                            onSubmit={handleSubmission}
                            encType="multipart/form-data"
                        >
                            <div className="listingDetails">
                                <div>
                                    <span>Brand:</span>{' '}
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        value={listingData.brand}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <span>Price: </span>{' '}
                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        value={listingData.price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <span>Category:</span>{' '}
                                    <input
                                        type="text"
                                        name="category"
                                        id="category"
                                        value={listingData.category}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <span>Condition:</span>{' '}
                                    <input
                                        type="text"
                                        name="condition"
                                        id="condition"
                                        value={listingData.condition}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <span>Quantity Available: </span>
                                    <input
                                        type="number"
                                        name="quantityAvailable"
                                        id="quantityAvailable"
                                        value={listingData.quantityAvailable}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <span>New Images : </span>{' '}
                                    <input
                                        type="file"
                                        name="images"
                                        id="images"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </div>
                                <div className="listingDescription">
                                    <span>Description: </span>{' '}
                                    <textarea
                                        required
                                        name="description"
                                        value={listingData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="editButtons">
                                <button>Update</button>
                                <button>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSingleListing