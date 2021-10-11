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

export {AddForum};