import {useState,useEffect, useRef} from "react"
import './MyList.css'
import { Alert } from 'react-bootstrap'
import { getUserList } from '../apis/profiles';
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import MessageLeft from '../components/MessageLeft'
import MessageRight from "../components/MessageRight";
import './Messages.css'
import { useLocation, useHistory } from 'react-router-dom';

function Messages(props) {

    const user = props.parentUser
    const setUser = props.parentSetUser 
    const [cookies,setCookie] = useCookies(['token']);
    const existsCookie = typeof cookies.token != "undefined"
    const [selectedUser, setSelectedUser] = useState() //The current selected account the user is talking to
    const [newUser, setNewUser] = useState()
    const [allUsers, setAllUsers] = useState([])    //Gets all users that user has messaged previously
    const [userPeek, setUserPeek] = useState({}) //Sneak peek for unselected users with latest messages
    const [selectedMessages, setSelectedMessages] = useState([]) //All messages for selected individual [message, from, to]
    let subprotocol = cookies.token
    const ws = useRef() //refer to as ws.current
    const wsURL = useRef()
    const locationProps = useLocation()
    const history = useHistory()

    useEffect(() => {
        var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        if (window.location.hostname == 'localhost') {
          wsURL.current = ws_scheme + '://' + window.location.hostname + ':8000/api/chat/'
        }
        else {
          wsURL.current = ws_scheme + '://' + window.location.hostname + '/api/chat/'
        }
        ws.current = new WebSocket(wsURL.current) 
        ws.current.onopen = function() {
          if (typeof(locationProps.state) !== 'undefined'){
            if (typeof(locationProps.state.userInfo) !== 'undefined'){
              let linkedUser = locationProps.state.userInfo.email
              history.replace({ state: {} })
              setSelectedUser(linkedUser)
              setNewUser(linkedUser)
              let payload = ({
                  "status": "get",
                  "user": linkedUser //other user the current user clickedd on
              })
              ws.current.send(JSON.stringify(payload))
            }

          }
        }
    }, [])

    useEffect(() => {
      ws.current.onmessage = function(event){
        if (event["data"]){
          let data = JSON.parse(event["data"])

          if (data["status"] == "updateChat"){ //announces there is a new message
            let message = data["message"]
            let from = data["from"]
            let to = data["to"]
            if (from == selectedUser || from == user.email){
              setSelectedMessages(prevSelectedMesssage => [...prevSelectedMesssage, [message, from, to]])
              if (from != user.email){
                setUserPeek(prevUserPeek => ({...prevUserPeek, [from]:message}))
              }
              else {
                setUserPeek(prevUserPeek => ({...prevUserPeek, [to]:message}))
              }
            }
            else{
              setUserPeek(prevUserPeek => ({...prevUserPeek, [from]:message}))
              if (!allUsers.includes(from)){
                setAllUsers(prevAllUsers => [from, ...prevAllUsers])
              }
            }
          }
          else if (data["status"] == "updateConnected"){ //grabs all messaged users once user connects
            let users = data["users"]
            let lastSent = data["lastSent"]
            setAllUsers(users)
            setUserPeek(lastSent)
          }
          else if (data["status"] == "getMessage"){
            let m = data["message"]
            setSelectedMessages(m)
          }
          else if (data["status"] == "eradicate"){
            setNewUser('')
            setAllUsers('')
            setSelectedMessages('')
            setSelectedUser('')
            locationProps.state = null
          }
        }
      }
    })


    let passProps = {
      setAllUsers: setAllUsers,
      allUsers: allUsers,
      userPeek: userPeek,
      setUserPeek: setUserPeek,
      selectedUser: selectedUser,
      setSelectedUser: setSelectedUser,
      selectedMessages: selectedMessages,
      setSelectedMessages: setSelectedMessages,
      ws: ws.current,
      newUser: newUser
      }
      
    if (existsCookie){
        return(
            <div id = "messageWrapper">
              <MessageLeft {...passProps}/>
{/*               <h1>You've selected {selectedUser} to message</h1>
              <h1 onClick = {() => console.log(selectedMessages)}>Check selectedMessages</h1> */}
              <MessageRight {...passProps}/>
             
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