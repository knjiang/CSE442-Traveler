// All profiles-related API calls

import {BASE_URL, getCsrfToken} from './base';

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
    return fetch(`${BASE_URL}/api/profiles/get_lists/`,
    {
        headers: {
            'Authorization' : 'Token ' + token
        },
        method: "GET",
    })
}

const changeLocation = async(token,location) => {
    return fetch(`${BASE_URL}/api/profiles/change_location/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "location" : location,
        }),
    })
}

const addLocationList = async(token,listName,locationName) => { 
    return fetch(`${BASE_URL}/api/profiles/add_location_list/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "listName": listName,
            "locationName": locationName,
        }),
    })
}

const deleteLocationList = async(token,listName,locationName) => { 
    return fetch(`${BASE_URL}/api/profiles/delete_location_list/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "listName": listName,
            "locationName": locationName,
        }),
    })
}


const addList = (token,listName) => {
    return fetch(`${BASE_URL}/api/profiles/add_list/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token
        },
        method: "POST",
        body : JSON.stringify({
            "listName" : listName
        }),
    })
}

const deleteList = (token,listName) => {
    return fetch(`${BASE_URL}/api/profiles/delete_list/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token
        },
        method: "POST",
        body : JSON.stringify({
            "listName" : listName
        }),
    })
}

const getUserList = () => {
    return fetch(`${BASE_URL}/api/profiles/search_filter/`) 
}

const getUserInfo = (email) => {
    const encoded_input = encodeURIComponent(email)
    return fetch(`${BASE_URL}/api/profiles/search_user/?user_email=${encoded_input}`, {
    method: "GET",
    }) 
}

const getListData = (token) => {
    return fetch(`${BASE_URL}/api/profiles/get_list_data/`,
    {
        headers: {
            'Authorization' : 'Token ' + token
        },
        method: "GET",
    })
}

const getSetShareableLink = async(token, listName) => {
    return fetch(`${BASE_URL}/api/profiles/shareable_link/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "listName": listName,
        }),
    })
}

export {getProfile, changeLocation, getList, getUserList, getUserInfo, getListData, addLocationList, deleteLocationList, addList, deleteList, getSetShareableLink}
