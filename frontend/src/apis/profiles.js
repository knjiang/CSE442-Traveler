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

const changeBackground = async(token,background) => {
    return fetch(`${BASE_URL}/api/profiles/change_background/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "background" : background,
        }),
    })
}

const getBackground = (background) => {
    const encoded_input = encodeURIComponent(background)
    return fetch(`${BASE_URL}/api/profiles/getBackground/`, {
        method: "GET",
    })

}

const changeVisited = async(token,visited) => {
    return fetch(`${BASE_URL}/api/profiles/change_visited/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "visited" : visited,
        }),
    })
}

const getVisited = (visited) => {
    const encoded_input = encodeURIComponent(visited)
    return fetch(`${BASE_URL}/api/profiles/getVisited/`, {
        method: "GET",
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

const addDescription = async(token, ListDescription, LocationList) => {
    return fetch(`${BASE_URL}/api/profiles/add_description/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "ListDescription": ListDescription,
            "LocationList": LocationList
        }),
    })
}

const editDescription = async(token, ListDescription,LocationList,NewDescription) => {
    return fetch(`${BASE_URL}/api/profiles/edit_description/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "ListDescription": ListDescription,
            "LocationList": LocationList,
            "NewDescription": NewDescription
        }),
    })
}

const delDescription = async(token, ListDescription,LocationList) => {
    return fetch(`${BASE_URL}/api/profiles/del_description/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "ListDescription": ListDescription,
            "LocationList": LocationList
        }),
    })
}

const getDescription = (token, list) =>{
    return fetch(`${BASE_URL}/api/profiles/get_description/?list=${list}`,
    {
        headers: {
            'Authorization' : 'Token ' + token,
        },
        method: "GET",     
    })
}

export {getProfile, changeLocation, getList, getUserList, getUserInfo, 
    getListData, addLocationList, deleteLocationList, addList, deleteList, 
    getSetShareableLink, changeBackground, 
    addDescription, editDescription, getDescription, delDescription, changeVisited}
// export {getProfile, changeLocation, getList, getUserList, getUserInfo, getListData, addLocationList, deleteLocationList, addList, deleteList, getSetShareableLink, changeBackground, changeVisited}
