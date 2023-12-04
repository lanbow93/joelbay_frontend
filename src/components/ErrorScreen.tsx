interface errorProps {
    closeModal: Function
    status: string
    message: string
    error: string
}

function ErrorScreen(props: errorProps) {

    return (
        <div className="errorScreen">
            <h1>{props.status}</h1>
            <h2>{props.message}</h2>
            <button onClick={() => props.closeModal(false)}>Close</button>
        </div>
    )
}

export default ErrorScreen