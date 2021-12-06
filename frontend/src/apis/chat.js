// All chat-related API calls

import {BASE_URL, getCsrfToken} from './base';

const createChat = async(token, users, message) => {
    return fetch(`${BASE_URL}/api/chat-request/create_chat/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "users": users,
            "message": message
        }),
    })
}

const renameChat = async(token, id, name) => {
    return fetch(`${BASE_URL}/api/chat-request/rename_chat/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "id": id,
            "name": name
        }),
    })
}

const addToGroupChat = async(token, users, id) => {
    return fetch(`${BASE_URL}/api/chat-request/add_to_group_chat/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "users": users,
            "id": id
        }),
    })
}

const removeFromGroupChat = async(token, user, id) => {
    return fetch(`${BASE_URL}/api/chat-request/remove_from_group_chat/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "user": user,
            "id": id
        }),
    })
}

const getChat = async(token, id) => {
    return fetch(`${BASE_URL}/api/chat-request/get_chat/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "id": id
        }),
    })
}

const deleteChat = async(token, id) => {
    return fetch(`${BASE_URL}/api/chat-request/delete_chat/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "id": id
        }),
    })
}

const getRecentChat = (token) => {
    return fetch(`${BASE_URL}/api/chat-request/get_recent_chat/`,
    {
        headers: {
            'Authorization' : 'Token ' + token
        },
        method: "GET",
    })
}

export {createChat, addToGroupChat, getChat, deleteChat, renameChat, removeFromGroupChat, getRecentChat};
