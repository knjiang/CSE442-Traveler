import {useState,useEffect} from "react"
import { getUserInfo } from '../apis/profiles';
import {getFriends, getFriendRequests, sendRequest} from '../apis/friends';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import './Homepage.css'

function Searched_Profile(props){

    const [user,setUser] = useState({
        search_query: '',
        username: '',
        email: window.location.pathname.substr(6),
        from_location: '',
        background: '',
    })
    const [cookies,setCookie] = useCookies(['token']);
    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const primary_user = props.parentUser
    const setPrimaryUser = props.parentSetUser 

    useEffect(() => {
        if (cookies.token && !primary_user.logged_in){
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

        getUserInfo(user.email)
        .then(response => response.json())
        .then(data => {
            setUser({
                username: data.first_name,
                from_location: data.from_location,
                email: data.email
              });
        })
      }, [])

    const addFriend = () => {
        sendRequest(cookies.token, user.email)
    }

    return(
        <div>
        <h1>Hi! This is {user.username}'s profile and I am from {user.from_location}!</h1>

        {/* On searched profile users can accept a request, send friend request, cancel the request.. Not sure if delete should be included*/}

        {(user.email in friends || user.email in friendRequests) ? <p>Already friends or user sent a request to you.</p> : <button onClick={() => addFriend()}> Send Friend Request </button>}
    
        {(primary_user.email != user.email) && <Link to = {{pathname: '/messages', state: {'userInfo': user}}}>Message {user.username}</Link>}
        {(primary_user.email == user.email) && <Button id = "notAllowed" style = {{cursor: "now-allowed"}}>Message {user.username}</Button>}
        </div>

        
    )
}

export default Searched_Profile;