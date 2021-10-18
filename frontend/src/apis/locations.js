// All location-related API calls

import {BASE_URL} from './base';

const getLocation = () => {
    return fetch(`${BASE_URL}/api/router/locations/`)
}

const getShareableContents = (url) => {
    const encoded_input = encodeURIComponent(url)
    return fetch(`${BASE_URL}/api/profiles/get_shareable_contents/?url=${encoded_input}`)
}

export {getLocation,getShareableContents}