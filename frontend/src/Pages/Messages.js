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
    //{id, name, users}
    const [newUser, setNewUser] = useState()
    const [allUsers, setAllUsers] = useState([])    //Gets all users that user has messaged previously
    const [userPeek, setUserPeek] = useState({}) //Sneak peek for unselected users with latest messages
    const [selectedMessages, setSelectedMessages] = useState({}) //All messages for selected individual
    const [recipents, setRecipents] = useState([])
    const [newChat, setNewChat] = useState(false)
    let subprotocol = cookies.token
    const ws = useRef() //refer to as ws.current
    const wsURL = useRef()
    const locationProps = useLocation()
    const history = useHistory()

    useEffect(() => {
        var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        if (window.location.hostname == 'localhost') {
          wsURL.current = ws_scheme + '://' + window.location.hostname + ':8000/api/chat-socket/'
        }
        else {
          wsURL.current = ws_scheme + '://' + window.location.hostname + '/api/chat-socket/'
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
          if (data["status"] == "updateConnected") {
            setAllUsers(data["chat"])
/*             let messages = chat.messages
            let name = chat.name.filter(item => item !== user.email).join()
            let type = chat.type */
            
          }
          else if (data["status"] == "updateChat") {
            if (!data['new']) {
              let sender = data["from"]
              let message = data["message"]
              let oldMessage = {...selectedMessages} 
              selectedMessages['messages'] ? oldMessage['messages'].push({"sender": sender, "message": message}) : oldMessage = {'messages': [{"sender": sender, "message": message}]}
              setSelectedMessages(oldMessage)
            }
            else {
              let title = ''
              if (!data['nameChanged']){
                  title = data['users'].filter(item => item !== user.email).join()
              }
              else {
                  title = data['name']
              }
              let sender = data["from"]
              let message = data["message"]
              let newSelected = {}
              newSelected['id'] = data['id']
              newSelected['messages'] = []
              newSelected.messages.push({"sender": sender, "message": message})
              setSelectedMessages(newSelected)
              setSelectedUser({id: data['id'], name: title, users: data['users'], group: data['group']})
            }
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
      newUser: newUser,
      newChat: newChat,
      setNewChat: setNewChat,
      user: user,
      cookies: cookies,
      recipents: recipents,
      setRecipents: setRecipents,
      locationProps: locationProps
      }
      
    if (existsCookie){
        return(
            <div id = "messageWrapper">
              <MessageLeft {...passProps}/>
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