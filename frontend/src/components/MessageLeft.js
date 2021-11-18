import {useState,useEffect,useRef} from "react"
import { Button } from 'react-bootstrap'

function MessageLeft(props) {

    const setAllUsers = props.setAllUsers
    const allUsers = props.allUsers
    const [filteredUsers, setFilteredUsers] = useState()
    const userPeek = props.userPeek
    const setUserPeek = props.setUserPeek
    const selectedUser = props.selectedUser
    const setSelectedUser = props.setSelectedUser
    const newUser = props.newUser
    const ws = props.ws
    const filter = useRef()

    const onClickUser = (m) => {
        setSelectedUser(m)
        let payload = ({
            "status": "get",
            "user": m //other user the current user clickedd on
          })
          ws.send(JSON.stringify(payload))
    }

    const userList = () => {
        let res = []
        if (typeof(allUsers) == "undefined" && newUser) {
            if (selectedUser == newUser){
                res.push(<div id = "userListWrapper" style = {{"display": "block", "backgroundColor": "lightgray"}} onClick = {() => onClickUser(newUser)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{newUser.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} >{newUser}</h1></div>
                <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[newUser]}</h1></div>)
            }
            else {
                res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(newUser)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{newUser.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} onClick = {() => onClickUser(newUser)}>{newUser}</h1></div>
                <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[newUser]}</h1></div>)
            }
        }
        else if (allUsers.length == 0 && newUser) {
            if (selectedUser == newUser){
                res.push(<div id = "userListWrapper" style = {{"display": "block", "backgroundColor": "lightgray"}} onClick = {() => onClickUser(newUser)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{newUser.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} >{newUser}</h1></div>
                <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[newUser]}</h1></div>)
            }
            else {
                res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(newUser)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{newUser.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} onClick = {() => onClickUser(newUser)}>{newUser}</h1></div>
                <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[newUser]}</h1></div>)
            }
        }
       else if (filteredUsers){
            if (newUser && !filteredUsers.includes(newUser)) {
                if (selectedUser == newUser){
                    res.push(<div id = "userListWrapper" style = {{"display": "block", "backgroundColor": "lightgray"}} onClick = {() => onClickUser(newUser)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{newUser.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} >{newUser}</h1></div>
                    <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[newUser]}</h1></div>)
                }
                else {
                    res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(newUser)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{newUser.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} onClick = {() => onClickUser(newUser)}>{newUser}</h1></div>
                    <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[newUser]}</h1></div>)
                }
        }
        else {
            if (newUser && !allUsers.includes(newUser)) {
                if (selectedUser == newUser){
                    res.push(<div id = "userListWrapper" style = {{"display": "block", "backgroundColor": "lightgray"}} onClick = {() => onClickUser(newUser)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{newUser.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} >{newUser}</h1></div>
                    <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[newUser]}</h1></div>)
                }
                else {
                    res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(newUser)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{newUser.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} onClick = {() => onClickUser(newUser)}>{newUser}</h1></div>
                    <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[newUser]}</h1></div>)
                }
            }
        }
        }

        if (filteredUsers){
            for (let m of filteredUsers) {
                if (selectedUser == m){
                    res.push(<div id = "userListWrapper" style = {{"display": "block", "backgroundColor": "lightgray"}} onClick = {() => onClickUser(m)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{m.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} onClick = {() => onClickUser(m)}>{m}</h1></div>
                    <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[m]}</h1></div>)
                }
                else {
                    res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(m)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{m.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.5vh"}} onClick = {() => onClickUser(m)}>{m}</h1></div>
                    <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[m]}</h1></div>)
                }
            }
        }

        return (
            <div>
                {res}
            </div>
        )
    }

    const filterUser = (e) => {
        let res = []
        let value = e.target.value
        if (value == '' || value == undefined || value == 'undefined') {
            setFilteredUsers(allUsers)
        }
        else {
            for (let m of allUsers){
                if (m.includes(value)){
                    res.push(m)
                }
            }
            setFilteredUsers(res)
        }
    }

    useEffect (() => {
        if (allUsers.length > 0 && !filteredUsers){
            setFilteredUsers(allUsers)
        }
    })

    const searchUsers = () => {
        let res = []
        if (allUsers) {
            if (filteredUsers) {
                for (let m of filteredUsers){
                    res.push(<h1 style = {{"fontSize": "2vh", "padding": "0.5vh"}} onClick = {() => (setSelectedUser(m), onClickUser(m))}>{m}</h1>)
                }
            }
          return (
              <div>
                  <div style = {{display: "flex", justifyContent: "end"}}>
                    <h1 style = {{fontSize: "3.5vh", textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>Messages </h1>
                    <i style = {{fontSize: "3.5vh", marginTop: "auto", marginBottom: "auto"}} id = "iconBTN" class="bi bi-pencil-square"></i>
                  </div>
                <div id = "dropdown" style = {{"display": "flex", "maxHeight": "5vh", "justifyContent": "space-between", "marginBottom": "1vh"}}>
                    <h1 style = {{"fontSize": "2.5vh", "marginRight": "0vw", "fontWeight": "800"}}>Search Users:</h1>
                    <input onChange = {(e) => filterUser(e)} id = "filterUser" style = {{"width": "17vw", "height": "4vh", "marginRight": "0.5vw"}}/>
    {/*               <div style = {{'marginTop': "4vh", "cursor": "pointer", "width": "16vw", "maxHeight": "15vh", "overflowY": "scroll"}}>
                    {res} 
                </div> */}
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
  

    return (
      <div id = "leftMessageWrapper">
          {searchUsers()}
          <div id = "userList">
            {userList()}
          </div>

      </div>
    )
}

export default MessageLeft;