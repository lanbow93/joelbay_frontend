import { ChangeEvent,useState } from "react"
import { useNavigate } from "react-router-dom"
import url from "../router/url"
import ErrorScreen from "../components/ErrorScreen"
import LoadingScreen from "../components/LoadingScreen"

interface InstrumentData {
    name: string;
    description: string;
    image: File | null | any; 
    price: number | any;
    quantityAvailable: number | any;
    brand: string;
    category: string;
    condition: string;
  }

  
function EditMenu(){
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [errorData, setErrorData] = useState({
        errorMessage: '',
        errorStatus: '',
        errorAdditional: '',
    })

    const [instrumentData, setInstrumentData] = useState<InstrumentData>({
        name: "",
        description: "",
        image: null,
        price: 0,
        quantityAvailable: 0,
        brand: "",
        category: "",
        condition: ""
    })
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle file change and update the state
        const files = event.target.files;
    
        if (files && files.length > 0) {
          const file = files[0];
          setInstrumentData((prevData) => ({ ...prevData, image: file }));
        }
      };
    
    const handleSubmission = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('name', instrumentData.name);
            formData.append('description', instrumentData.description);
            formData.append('image', instrumentData.image); // Append the file
            formData.append('price', instrumentData.price);
            formData.append('quantityAvailable', instrumentData.quantityAvailable);
            formData.append('brand', instrumentData.brand);
            formData.append('category', instrumentData.category);
            formData.append('condition', instrumentData.condition);
      
            const response = await fetch(url + '/instruments', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              navigate('/editmenu');
            } else {
              const data = await response.json();
              const { error, message, status } = data;
              setErrorData({
                errorMessage: message,
                errorAdditional: status,
                errorStatus: error,
              });
              setIsModalActive(true);
            }
          } catch (error) {
            console.error('Error during submission:', error);
          } finally {
            setIsLoading(false);
          }
        };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target
        // Use the validateNoSpaces function for the username field

        setInstrumentData({ ...instrumentData, [name]: value })
    }
    const navigate = useNavigate()





    return (
        <>
        
            <div className="editMenu">
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

                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <form onSubmit={handleSubmission}>
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
<label>Image:</label>
    <input
        required
        type="file"
        name="image"
        id="image"
        onChange={handleFileChange}
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

                )}
            </div>
        </>
    )
}

export default EditMenu