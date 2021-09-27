// All profiles-related API calls

import {BASE_URL} from './base';

const getProfile = (token) => {
    return fetch(`${BASE_URL}/api/profiles/get_profile/`,
    {
        headers: {
            'Authorization' : 'Token ' + token
        },
        method: "GET",
    })
}

const getList = (token) => {
    return fetch(`${BASE_URL}/lists/`,
    {
        headers: {
            'Authorization' : 'Token ' + token
        },
        method: "GET",
    })
}

const changeLocation = (token,location) => {
    return fetch(`${BASE_URL}/api/profiles/change_location/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token
        },
        method: "POST",
        body : JSON.stringify({
            "location" : location,
        }),
    })
}

const changeList = (token,name,list) => {
    return fetch(`${BASE_URL}/api/profiles/change_list`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token
        },
        method: "POST",
        body : JSON.stringify({
            "name" : name,
            "list" : list
        }),
    })
}

export {getProfile, getList, changeLocation, changeList}