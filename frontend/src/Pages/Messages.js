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
                    <h1>{item}</h1>)}
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
            <Alert style = {{"height": "8vh", "width": "80%", "textAlign":"center", "marginLeft": "auto", "marginRight": "auto", "opacity":"0%"}} show={true} variant="danger" dismissible>
                {// Fake modal for spacing}
                }
            </Alert>    
            <div id = "lists">
                <div id = "leftList">
                    <div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h1 style = {{"fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}> Users </h1></div>
                        <div id = "listScroller">

                        </div>

                        <div style = {{"textAlign":"center"}}>
                            
                        </div>

                    </div>
                <div id = "rightList">
                <div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h1 style = {{"fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}> </h1></div>
                    <div id = "listScroller">
                    </div>
                </div>
            </div> 
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