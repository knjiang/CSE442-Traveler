import {useState,useEffect,useRef} from "react"
import { Button, Dropdown, Modal} from 'react-bootstrap'
import { getChat, deleteChat, renameChat } from '../apis/chat'

function MessageLeft(props) {

    const user = props.user
    const setAllUsers = props.setAllUsers
    const allUsers = props.allUsers
    const [filteredUsers, setFilteredUsers] = useState()
    const userPeek = props.userPeek
    const setUserPeek = props.setUserPeek
    const selectedUser = props.selectedUser
    const setSelectedUser = props.setSelectedUser
    const selectedMessages = props.selectedMessages //All messages for selected individual [message, from, to]
    const setSelectedMessages = props.setSelectedMessages 
    const newUser = props.newUser
    const ws = props.ws
    const filter = useRef()
    const newChat = props.newChat
    const setNewChat = props.setNewChat
    const cookies = props.cookies

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const onClickUser = (m) => {
        setNewChat(false)
        let title = ''
        if (!m['nameChanged']){
            title = m['users'].filter(item => item !== user.email).join()
        }
        else {
            title = m['name']
        }
        setSelectedUser({"id": m["id"], "name": title, "users": m['users']})
        getChat(cookies.token, m['id'])
        .then(response => response.json())
        .then(data => {
            setSelectedMessages(data)
        })
    }

    const userList = () => {
        let res = []
/*         if (filteredUsers){
            for (let m of filteredUsers) {
                m = m['name'].replace(user.email + ', ', '').replace(', ' + user.email, '')
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
 */ 
        if (filteredUsers) {
            for (let m of filteredUsers){
                let title = ''
                if (!m['nameChanged']){
                    title = m["users"].filter(item => item !== user.email).join()
                }
                else {
                    title = m['name']
                }
                if (selectedUser) {
                    if (selectedUser.id == m['id']){
                        res.push(<div id = "userListWrapper" style = {{"display": "block", "backgroundColor": "lightgray", maxWidth: "30rem"}} onClick = {() => onClickUser(m)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{title.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.25vh", maxWidth: "25vw", overflowWrap: "break-word"}}>{title}</h1></div>
                        <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[m]}</h1></div>)
                    }
                    else {
                        res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(m)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{title.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.25vh", maxWidth: "25vw", overflowWrap: "break-word"}}>{title}</h1></div>
                        <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[m]}</h1></div>)
                    }
                }
                else {
                    res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(m)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.25vw"}}>{title.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "2.25vh", maxWidth: "25vw", overflowWrap: "break-word"}}>{title}</h1></div>
                    <h1 id = "peek" style = {{"fontSize":"2vh"}}>{userPeek[m]}</h1></div>)
                }
            }
            return (
                <div>
                    {res}
                </div>
            ) 
        }

    }

    const filterUser = (e) => {
        //allUsers => id, type, name, users, nameChanged
        let res = []
        let value = e.target.value
        if (value == '' || value == undefined || value == 'undefined') {
            setFilteredUsers(allUsers)
        }
        else {
            for (let m of allUsers){
                let name = m.name
                if (name.includes(value)){
                    res.push(m)
                }
            }
            setFilteredUsers(res)
        }
    }

    useEffect (() => {
        if (allUsers.length > 0 && allUsers != filteredUsers) {
            setFilteredUsers(allUsers)
        }
    })

    const changeName = () => {
        renameChat(cookies.token, selectedUser.id, document.getElementById("nameInput").value)
        document.getElementById("nameInput").value = ""
        handleClose()
        window.location.reload()
    }

    const chatMenu = () => {
        if (selectedUser){
            if (selectedUser.users.length > 2){
                return (
                    <div>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" style = {{backgroundColor: "white", border: "none"}}>
                            <i style = {{color: "black", fontSize: "1.1rem"}} class="bi bi-three-dots"></i>
                        </Dropdown.Toggle>
    
                        <Dropdown.Menu>
                            <Dropdown.Item onClick = {() => (deleteChat(cookies.token, selectedMessages.id), window.location.reload())}>Delete chat</Dropdown.Item>
                            <Dropdown.Item onClick = {() => handleShow()}>Rename chat</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>   
                )
            }
            else {
                return (
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style = {{backgroundColor: "white", border: "none"}}>
                                <i style = {{color: "black", fontSize: "1.1rem"}} class="bi bi-three-dots"></i>
                            </Dropdown.Toggle>
        
                            <Dropdown.Menu>
                                {selectedUser && <Dropdown.Item onClick = {() => (deleteChat(cookies.token, selectedMessages.id), window.location.reload())}>Delete chat</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>   
                )
            }
        }

    }

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

                    <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                        >
                            <Modal.Header closeButton>
                            <Modal.Title>Renaming group chat</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            New name: <input id = "nameInput"/>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick = {() => changeName()}>Submit</Button>
                            </Modal.Footer>
                    </Modal>

                  <div style = {{display: "flex", justifyContent: "end", width: "99%"}}>
                    {chatMenu()}
                    <h1 style = {{fontSize: "3.5vh", textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>Messages</h1>
                    <i style = {{fontSize: "3.5vh", marginTop: "auto", marginBottom: "auto", cursor: "pointer"}} id = "iconBTN" class="bi bi-pencil-square" onClick = {() => (setNewChat(true), setSelectedUser())}></i>
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