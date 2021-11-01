import {useState,useEffect} from "react"
import { getUserInfo } from '../apis/profiles';

function Searched_Profile(props){

    const [user,setUser] = useState({
        search_query: '',
        username: '',
        email: window.location.pathname.substr(6),
        from_location: '',
        background: '',
    })

    useEffect(() => {
        getUserInfo(user.email)
        .then(response => response.json())
        .then(data => {
            setUser({
                username: data.first_name,
                from_location: data.from_location
              });
        })
      }, [])

    const addFriend = () => {
        return
    }

    return(
        <div>
        <h1>Hi! This is {user.username}'s profile and I am from {user.from_location}!</h1>

        {/* On searched profile users can accept a request, send friend request, cancel the request.. Not sure if delete should be included*/}
        <button onClick={() => addFriend()}>
            Add Friend
        </button>
        </div>
    )
}

export default Searched_Profile;