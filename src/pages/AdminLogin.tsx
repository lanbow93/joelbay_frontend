import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorScreen from '../components/ErrorScreen'
import url from '../router/url'
import Loading from '../components/Loading'

function AdminLogin() {
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
                navigate('/editmenu')
            } else {
                const data = await response.json()
                console.log(data);
                const { error, message, status } = data
                setErrorData({
                    errorMessage: message,
                    errorAdditional: status,
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
                    <Loading />
                ) : (
                    <form onSubmit={handleSubmission}>
                        <h2>Admin Login</h2>
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

export default AdminLogin