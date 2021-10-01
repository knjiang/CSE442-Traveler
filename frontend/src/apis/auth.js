// All authentication-related API calls

import {BASE_URL,getCsrfToken} from './base';

const loginBackend = async(accessToken) => {
    return fetch(`${BASE_URL}/dj-rest-auth/google/`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
        body: JSON.stringify({
          "access_token": accessToken,
          "code": "",
          "id_token": "",
      })
    })
}

const logoutBackend = async(token) => {
    return fetch(`${BASE_URL}/dj-rest-auth/logout/`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Token ' + token,
          'X-CSRFToken': await getCsrfToken(),
        },
        method: "POST",
    })
}
export {loginBackend,logoutBackend};