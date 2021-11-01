// All friends-related API calls

import {BASE_URL} from './base';

const getFriendList = () => {
    return fetch(`${BASE_URL}/api/friends/get_friends/`) 
}

export {getFriendList}