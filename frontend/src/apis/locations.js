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

export {getLocation, addLocation, delLocation}