// All friends-related API calls

import {BASE_URL} from './base';

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



export {getFriends, getFriendRequests}