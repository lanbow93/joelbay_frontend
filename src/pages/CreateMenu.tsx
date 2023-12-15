import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorScreen from '../components/ErrorScreen'
import Loading from '../components/Loading'
import { createListing } from '../utils/apiCalls'

interface InstrumentData {
    name: string
    description: string
    images: File[] | null | any
    price: number | any
    quantityAvailable: number | any
    brand: string
    category: string
    condition: string
}

function CreateMenu() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [errorData, setErrorData] = useState({
        errorMessage: '',
        errorStatus: '',
        errorAdditional: '',
    })

    const [instrumentData, setInstrumentData] = useState<InstrumentData>({
        name: '',
        description: '',
        images: null,
        price: 0,
        quantityAvailable: 0,
        brand: '',
        category: '',
        condition: '',
    })

    const navigate = useNavigate()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files && files.length > 0) {
            const fileList = Array.from(files)
            setInstrumentData((prevData) => ({ ...prevData, images: fileList }))
        }
    }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target
        setInstrumentData({ ...instrumentData, [name]: value })
    }

    const handleSubmission = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData()

        // Append form data
        Object.entries(instrumentData).forEach(([key, value]) => {
            if (key === 'images') {
                value.forEach((file: File, index: number) => {
                    formData.append(`${key}[${index}]`, file)
                })
            } else {
                formData.append(key, value)
            }
        })
        const response = await createListing(formData)
        setIsLoading(false)
        if (response.data) {
            console.log(response.data)
            navigate('/createMenu')
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
        <>
            <div className="createMenu">
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

                <form onSubmit={handleSubmission} encType="multipart/form-data">
                    <h2>Instrument Details</h2>

                    <label>Name:</label>
                    <input
                        required
                        type="text"
                        name="name"
                        value={instrumentData.name}
                        onChange={handleInputChange}
                    />

                    <label>Price:</label>
                    <input
                        required
                        type="number"
                        name="price"
                        value={instrumentData.price}
                        onChange={handleInputChange}
                    />

                    <label>Quantity Available:</label>
                    <input
                        required
                        type="number"
                        name="quantityAvailable"
                        value={instrumentData.quantityAvailable}
                        onChange={handleInputChange}
                    />

                    <label>Brand:</label>
                    <input
                        required
                        type="text"
                        name="brand"
                        value={instrumentData.brand}
                        onChange={handleInputChange}
                    />

                    <label>Category:</label>
                    <input
                        required
                        type="text"
                        name="category"
                        value={instrumentData.category}
                        onChange={handleInputChange}
                    />

                    <label>Condition:</label>
                    <input
                        required
                        type="text"
                        name="condition"
                        value={instrumentData.condition}
                        onChange={handleInputChange}
                    />
                    <label>Images:</label>
                    <input
                        required
                        type="file"
                        name="images"
                        id="images"
                        onChange={handleFileChange}
                        multiple
                    />
                    <label>Description:</label>
                    <textarea
                        required
                        name="description"
                        value={instrumentData.description}
                        onChange={handleInputChange}
                    />

                    <button type="submit" className="activated">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateMenu
