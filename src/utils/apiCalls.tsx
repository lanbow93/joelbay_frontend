import url from '../router/url'

export async function listingCall() {
    try {
        const response = await fetch(url + '/instruments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            return { data: await response.json() }
        } else {
            return { error: await response.json() }
        }
    } catch (error) {
        return { error }
    }
}

export async function singleListingCall(id: string) {
    try {
        const response = await fetch(url + `/instruments/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            return { data: await response.json() }
        } else {
            return { error: await response.json() }
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
            return { data: await response.json() }
        } else {
            return { error: await response.json() }
        }
    } catch (error) {
        return { error }
    }
}

export async function createListing(formData: FormData) {
    try {
        const response = await fetch(url + '/instruments', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
        if (response.ok) {
            return { data: await response.json() }
        } else {
            return { error: await response.json() }
        }
    } catch (error) {
        return { error }
    }
}
