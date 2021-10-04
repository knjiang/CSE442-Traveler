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
    return fetch(`${BASE_URL}/api/router/lists/`,
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

//Nrrds delete once add delete are functioning
const changeList = async(token,name,list) => {
    return fetch(`${BASE_URL}/api/profiles/change_list`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "name" : name,
            "list" : list
        }),
    })
}

const addDeleteLocationList = async(token,listName,locationName,operation) => { 
    let cookie = await getCsrfToken()
    console.log(cookie)
    return fetch(`${BASE_URL}/api/profiles/add_delete_location_list`,
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
            "operation": operation //true for add, false for delete
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

const getQuery = (e,email) => {
    e.preventDefault()
    const encoded_input = encodeURIComponent(email)
    return fetch(`${BASE_URL}/api/profiles/search_user/?user_email=${encoded_input}`, {
    method: "GET",
    }) 
}

export {getProfile, changeLocation, getQuery, changeList, addDeleteLocationList, getList, addList}
