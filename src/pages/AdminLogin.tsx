import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorScreen from '../components/ErrorScreen'
import Loading from '../components/Loading'
import { adminLogin } from '../utils/apiCalls'

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
        const response: any = await adminLogin(JSON.stringify(userData))
        setIsLoading(false)
        if (response.data) {
            navigate('/editmenu')
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
