// All location-related API calls

import {BASE_URL} from './base';

const getLocation = () => {
    return fetch(`${BASE_URL}/api/router/locations/`)
}

const addLocation = (location) => {
    return fetch(`${BASE_URL}/api/profiles/add_location/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body : JSON.stringify({
            "name": location
        }),
    })
}

const delLocation = (location) => {
    return fetch(`${BASE_URL}/api/profiles/del_location/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body : JSON.stringify({
            "name": location
        }),
    })
}

const getShareableContents = (url) => {
    const encoded_input = encodeURIComponent(url)
    return fetch(`${BASE_URL}/api/profiles/get_shareable_contents/?url=${encoded_input}`)
}

export {getLocation,getShareableContents,addLocation, delLocation}
