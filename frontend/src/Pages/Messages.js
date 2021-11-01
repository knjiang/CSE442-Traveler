import {useState,useEffect} from "react"
import './MyList.css'
import { Alert } from 'react-bootstrap'
import { getUserList } from '../apis/profiles';
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';

function Messages(props) {

    const user = props.parentUser
    const setUser = props.parentSetUser 
    const [cookies,setCookie] = useCookies(['token']);
    const existsCookie = typeof cookies.token != "undefined"
    const [selectedUser, setSelectedUser] = useState() //The current selected account the user is talking to
    const [allUsers, setAllUsers] = useState([])    //Gets all users for user to search for

    useEffect(() => {
        getUserList()
        .then(response => response.json())
        .then(data => {
            setAllUsers(data.users)
        })
    }, [])

    const searchUsers = () => {
        if (allUsers) {
          return (
            <div id = "dropdown">
              <input></input>
              <div id="dropdown-content">
                {allUsers.map((item) => 
                    <h1 onClick = {() => setSelectedUser(item)}>{item}</h1>)}
              </div>
            </div>
          )
        }
        else {
          return (
            <div id = "dropdown">
            <input>No available users</input>
          </div>
          )
        }
      }

      
    if (existsCookie){
        return(
            <div>
              <h1>Users</h1>
              {searchUsers()}
              <h1>You've selected {selectedUser} to message</h1>
            </div> 

        )
   }
    else {
        return (
            <div>You are not logged in</div>
        )
    }
}

export default Messages;