import url from '../router/url'

export async function listingCall(originUrl: string) {
    let queries = ''
    if (originUrl === '/specials') {
        queries = '?discount=true'
    }
    try {
        const response = await fetch(url + '/listings/' + queries, {
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
        const response = await fetch(url + `/listings/${id}`, {
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
        const response = await fetch(url + '/listings', {
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

export async function updateListing(formData: FormData, id: number) {
    try {
        const response = await fetch(url + `/listings/${id}`, {
            method: 'PUT',
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

export async function emailSubmission(emailForm: string) {
    try {
        const response = await fetch(url + '/contact/iteminquiry', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: emailForm,
        })
        if (response.ok) {
            return { data: 'success' }
        } else {
            return await response.json()
        }
    } catch (error) {
        return { error }
    }
}

export async function deleteListing(id: number) {
    try {
        const response = await fetch(url + '/listings/' + id, {
            method: 'DELETE',
            credentials: 'include',
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
