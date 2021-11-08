import {useState,useEffect} from "react"
import {getFriends, getFriendRequests, acceptRequest, deleteRequest, deleteFriend} from '../apis/friends';
import { useCookies } from 'react-cookie';

function MyFriends(props){

    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const [cookies,setCookie] = useCookies(['token']);
    const user = props.parentUser
    const setUser = props.parentSetUser 

    useEffect(() => {
        if (cookies.token && !user.logged_in){
            getFriends(cookies.token)
            .then(response => response.json())
            .then(data => {
                setFriends(data.friends_list)
            })

            getFriendRequests(cookies.token)
            .then(response => response.json())
            .then(data => {
                setFriendRequests(data.requests_list)
            })
        }
    }, [])

    const acceptBtn = (f) => {
        acceptRequest(cookies.token, f)
    }

    const deleteBtn = (f) => {
        deleteRequest(cookies.token, f)
    }

    const unFriend = (f) => {
        deleteFriend(cookies.token, f)
    }

        // Should show list of friend requests where you can add friend (Accept request) or delete the request
        return(
            <div>
                <p>Friend Requests</p>
                <ul>
                    {friendRequests.map((f) => 
                        <li>
                            {f}
                            <button onClick={() => acceptBtn(f)}> Accept Request </button>
                            <button onClick={() => deleteBtn(f)}> Delete Request </button>
                        </li>
                    )}
                </ul>
                <br/>
                <p>My Friends</p>
                <ul>
                    {friends.map((f) => 
                        <li>
                            {f}
                            <button onClick={() => unFriend(f)}> Unfriend </button>
                        </li>
                    )}
                </ul>
            </div>
        );
    // Should lead to users page and there should be a button to remove from my friend list.
}

export default MyFriends;