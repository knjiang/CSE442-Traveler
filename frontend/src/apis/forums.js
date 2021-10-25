// All Forum related api calls

import {BASE_URL, getCsrfToken} from './base';


const AddPost = async(token, title, body, location) => {
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
            "title" : title,
            "body" : body,
            "location" : location
        }),
    })
}

const AddComment = async(token,body,postID) => {
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
            "body": body,
            "postID": postID
        }),
    })
}

const GetPostByLocation = (token,locationName) => { 
    return fetch(`${BASE_URL}/api/forums/get_post_by_location/?location=${locationName}`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
        },
        method: "GET",
    })
}

const GetCommentFromPost = (token, id) => {
    return fetch(`${BASE_URL}/api/forums/get_comment_from_post/?post_id=${id}`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
        },
        method: "GET",
    })
}

const getUserComment = async(token) => {
    return fetch(`${BASE_URL}/api/forums/get_comment/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "GET",
    })
}

const getUserPost = async(token) => {
    return fetch(`${BASE_URL}/api/forums/get_post/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "GET",
    })
}

const delUserPost = async(token, id) => {
    return fetch(`${BASE_URL}/api/forums/del_post/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "postID": id
        }),
    })
}

const delUserComment = async(token, id) => {
    return fetch(`${BASE_URL}/api/forums/del_comment/`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Token ' + token,
            'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body : JSON.stringify({
            "commentID": id
        }),
    })
}


export { AddPost, AddComment, GetPostByLocation, GetCommentFromPost, getUserPost, getUserComment, delUserPost, delUserComment };