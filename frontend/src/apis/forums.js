// All Forum related api calls

import {BASE_URL, getCsrfToken} from './base';

//write apis
const AddForum = async(token,name) => {
    return fetch(`${BASE_URL}/api/forums/add_forum/`,
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
        }),
    })
}

const AddPost = async(token,name) => {
    return fetch(`${BASE_URL}/api/forums/add_post/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "forum_name" : forum_name,
            "title": title,
            "body":body
        }),
    })
}

const AddComment = async(token,name) => {
    return fetch(`${BASE_URL}/api/forums/add_comment/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "post_name" : post_name,
            "body": body
        }),
    })
}


export {AddForum};