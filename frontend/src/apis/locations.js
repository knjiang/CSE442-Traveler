// All profiles-related API calls

import {BASE_URL} from './base';

const getLocation = (token) => {
    return fetch(`${BASE_URL}/locations/`)
}

export {getLocation}