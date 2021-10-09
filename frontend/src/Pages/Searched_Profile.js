import {useState,useEffect} from "react"
import { getUserInfo } from '../apis/profiles';

function Searched_Profile(props){

    const [user,setUser] = useState({
        search_query: '',
        username: '',
        email: props.location.state.searched_email,
        from_location: '',
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
        <h1>Hi! This is {user.username} and I am from {user.from_location}!</h1>
    )
}

export default Searched_Profile;