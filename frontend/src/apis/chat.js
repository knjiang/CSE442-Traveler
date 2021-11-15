// All chat-related API calls

import {BASE_URL, getCsrfToken} from './base';

const createGroupChat = async(token, users, name) => {
    return fetch(`${BASE_URL}/api/chat-request/create_group_chat/`,
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

export {createGroupChat, addToGroupChat};