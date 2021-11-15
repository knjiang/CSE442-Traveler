import {useState,useEffect} from "react"
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function MessageRight(props) {

    const setAllUsers = props.setAllUsers
    const allUsers = props.allUsers
    const userPeek = props.userPeek
    const setUserPeek = props.setUserPeek
    const selectedUser = props.selectedUser
    const setSelectedUser = props.setSelectedUser
    const selectedMessages = props.selectedMessages //All messages for selected individual [message, from, to]
    const setSelectedMessages = props.setSelectedMessages 
    const ws = props.ws

    const showMessages = () => {
        let res = []
        for (let m of selectedMessages) {
            let message = m[0]
            let from  = m[1]
            let to = m[2]
            if (from == selectedUser){
                res.push(<div id = "dmFrom"><Link to = {{pathname: '/user/' + from, state: {"name": from} }} id = "userLogoFrom" >{from.substring(0, 3)}</Link><h1 id = "messageTextFrom">{message}</h1></div>)
            }
            else {
                res.push(<div id = "dmTo"><h1 id = "messageTextTo">{message}</h1><Link to = {{pathname: '/user/' + from, state: {"name": from} }} id = "userLogoTo">{from.substring(0, 3)}</Link></div>)
            }
        }
        return (
            <div id= "messagesList">
                {res}
            </div>
        )
    }

    useEffect (() => {
        if (setSelectedMessages){
            var objDiv = document.getElementById("messagesList");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    })

    const inputSubmitter = () => {
        let m = document.getElementById("inputMessage").value
        if (m.length > 0){
            let payload = ({
                "status": "solo_message",
                "receiver": selectedUser,
                "message": document.getElementById("inputMessage").value
              })
              ws.send(JSON.stringify(payload))
              document.getElementById("inputMessage").value = ""
        }
    }

    const inputTyper = () => {
        return (
            <div id = "messageInput">
            <form onSubmit = {(e) => (e.preventDefault(), inputSubmitter())}>
                <input id = "inputMessage"/><Button onClick = {() => inputSubmitter()}>Send</Button>
             </form>   
            </div>

        )
    }

    return (
      <div id = "rightMessageWrapper">
         {selectedUser && <h3 style = {{"fontSize": "2.5vh", "textAlign": "center", "fontWeight":"800"}}>Showing messages with {selectedUser}</h3>}
         {showMessages()}  
         {selectedUser && inputTyper()}
      </div>
    )
}

export default MessageRight;