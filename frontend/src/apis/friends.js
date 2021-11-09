// All friends-related API calls

import {BASE_URL, getCsrfToken} from './base';

const getFriends = (token) => {
    return fetch(`${BASE_URL}/api/friends/get_friends/`,
    {
        headers: {
            'Authorization' : 'Token ' + token
        },
        method: "GET",
    })
}

const getFriendRequests = (token) => {
    return fetch(`${BASE_URL}/api/friends/get_friend_requests/`,
    {
        headers: {
            'Authorization' : 'Token ' + token
        },
        method: "GET",
    })
}

const sendRequest = async(token, email) => {
    return fetch(`${BASE_URL}/api/friends/send_request/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "friend" : email,
        }),
    })
}

const acceptRequest = async(token, email) => {
    return fetch(`${BASE_URL}/api/friends/accept_request/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "friend" : email,
        }),
    })
}

const deleteRequest = async(token, email) => {
    return fetch(`${BASE_URL}/api/friends/delete_request/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "friend" : email,
        }),
    })
}

const deleteFriend = async(token, email) => {
    return fetch(`${BASE_URL}/api/friends/delete_friend/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "friend" : email,
        }),
    })
}

export {getFriends, getFriendRequests, sendRequest, acceptRequest, deleteRequest, deleteFriend}