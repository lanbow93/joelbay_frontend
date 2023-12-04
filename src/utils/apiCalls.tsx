import url from '../router/url'

interface errorResponse {
    status: string
    message: string
    error: string | Object
}

export async function listingCall() {
    try {
        const response = await fetch(url + '/instruments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const listingInformation = await response.json()
            return { data: listingInformation }
        } else {
            const errorData: errorResponse = await response.json()
            return { error: errorData }
        }
    } catch (error) {
        return { error }
    }
}

export async function adminLogin(userData: string) {
    try {
        const response = await fetch(url + '/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: userData,
        })

        if (response.ok) {
            return { data: 'success' }
        } else {
            const data: errorResponse = await response.json()
            console.log(data)
            return { error: data }
        }
    } catch (error) {
        return { error }
    }
}
