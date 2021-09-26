// All authentication-related API calls

import {BASE_URL} from './base';

const loginBackend = (accessToken) => {
    return fetch(`${BASE_URL}/dj-rest-auth/google/`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "access_token": accessToken,
          "code": "",
          "id_token": "",
      })
    })
}

const logoutBackend = (token) => {
    return fetch(`${BASE_URL}/dj-rest-auth/logout/`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Token ' + token
        },
        method: "POST",
    })
}
export {loginBackend,logoutBackend};