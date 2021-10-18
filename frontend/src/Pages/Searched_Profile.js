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

    return(
        <h1>Hi! This is {user.username}'s profile and I am from {user.from_location}!</h1>
    )
}

export default Searched_Profile;