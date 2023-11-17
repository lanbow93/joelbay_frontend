import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorScreen from '../components/ErrorScreen'
import LoadingScreen from '../components/LoadingScreen'
import url from '../router/url'

function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [errorData, setErrorData] = useState({
        errorMessage: '',
        errorStatus: '',
        errorAdditional: '',
    })
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate()

    const handleSubmission = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(url + '/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            })

            if (response.ok) {
                const jsonResponse = await response.json()
                sessionStorage.setItem(
                    'account',
                    JSON.stringify(jsonResponse.data)
                )
                navigate('/home')
            } else {
                const data = await response.json()
                console.log(data);
                const { error, message, status } = data
                setErrorData({
                    errorMessage: status,
                    errorAdditional: message,
                    errorStatus: error,
                })
                setIsModalActive(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        // Use the validateNoSpaces function for the username field

        setUserData({ ...userData, [name]: value })
    }

    return (
        <>
        
            <div className="loginPage">
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
                        <h2>Speedy Login</h2>
                        <label>Username:</label>
                        <input
                            required
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                        />
                        <label>Password:</label>
                        <input
                            required
                            type="password"
                            name="password"
                            value={userData.password}
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

export default Login