import {useState,useEffect} from "react"
import {getFriends, getFriendRequests} from '../apis/friends';

function MyFriends(){

    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(() => {
        getFriends()
        .then(response => response.json())
        .then(data => {
            setFriends(data.friends_list)
        })
    }, [])

        // Should show list of friend requests where you can add friend (Accept request) or delete the request
        return(
            <div>
                MyFriends page shows up
            </div>
        );
    // Should lead to users page and there should be a button to remove from my friend list.
}

export default MyFriends;