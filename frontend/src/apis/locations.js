// All location-related API calls

import {BASE_URL} from './base';

const getLocation = () => {
    return fetch(`${BASE_URL}/api/router/locations/`)
}

export {getLocation}