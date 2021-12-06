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
    const recipents = props.recipents
    const setRecipents = props.setRecipents
    const newChat = props.newChat
    const setNewChat = props.setNewChat
    const cookies = props.cookies
    const locationProps = props.locationProps

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
        setSelectedUser({"id": m["id"], "name": title, "users": m['users'], "type": m['type']})
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
                if (selectedUser && selectedMessages.messages) {
                    if (selectedUser.id == m['id']){
                        res.push(<div id = "userListWrapper" style = {{"display": "block", "backgroundColor": "lightgray"}} onClick = {() => onClickUser(m)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.1rem"}}>{title.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "1rem", maxWidth: "18rem", maxHeight: "3.1rem", overflowWrap: "break-word", overflow: "hidden", }}>{title}</h1></div>
                        <h1 id = "peek" style = {{"fontSize":"1rem"}}></h1></div>)
                    }
                    else {
                        res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(m)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.1rem"}}>{title.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "1rem", maxWidth: "18rem", overflowWrap: "break-word", maxHeight: "3.1rem", overflow: "hidden", marginBottom: "auto"}}>{title}</h1></div>
                        <h1 id = "peek" style = {{"fontSize":"1rem"}}></h1></div>)
                    }
                }
                else {
                    res.push(<div id = "userListWrapper" style = {{"display": "block"}} onClick = {() => onClickUser(m)}><div style = {{"display": "flex"}}><h1 id = "userLogoFrom" style = {{"marginLeft": "0.1rem"}}>{title.substring(0, 3)}</h1><h1 id = "userText" style = {{"fontSize": "1rem", maxWidth: "18rem", overflowWrap: "break-word", maxHeight: "3.1rem", overflow: "hidden", marginBottom: "auto"}}>{title}</h1></div>
                    <h1 id = "peek" style = {{"fontSize":"1rem"}}></h1></div>)
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
        if (allUsers.length > 0 && allUsers != filteredUsers && document.getElementById("filterUser").value.length == 0) {
            setFilteredUsers(allUsers)
        }
        if (locationProps.state && !selectedUser) {
            if (locationProps.state.type == 'email') {
                for (let u of allUsers) {
                    if ((u.type == "Single" && JSON.stringify(u.users) == JSON.stringify([user.email, locationProps.state.user])) || (u.type == "Single" && JSON.stringify(u.users) == JSON.stringify([locationProps.state.user, user.email]))) {
                        setSelectedUser(u)
                        onClickUser(u)
                        locationProps.state = {}
                    }
                    else {
                        setNewChat(true)
                        setSelectedUser()
                        setRecipents([locationProps.state.user])
                    }
                }
            }
            if (locationProps.state.type == 'id') {
                for (let u of allUsers) {
                    if (u.id == locationProps.state.user) {
                        setSelectedUser(u)
                        onClickUser(u)
                        locationProps.state = {}
                    }
                }
            }
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
            if (selectedUser.type == 'Group'){
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
                    res.push(<h1 style = {{"fontSize": "5rem", "padding": "0.1rem"}} onClick = {() => (setSelectedUser(m), onClickUser(m))}>{m}</h1>)
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
                    <h1 style = {{fontSize: "1.5rem", textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>Messages</h1>
                    <i style = {{fontSize: "1.5rem", marginTop: "auto", marginBottom: "auto", cursor: "pointer"}} id = "iconBTN" class="bi bi-pencil-square" onClick = {() => (setNewChat(true), setSelectedUser(), setRecipents(''))}></i>
                  </div>
                <div id = "dropdown" style = {{"display": "flex", "maxHeight": "3rem", "justifyContent": "space-between", "marginBottom": "0.5rem"}}>
                    <h1 style = {{"fontSize": "0.9rem", "marginRight": "0vw", "fontWeight": "800", marginTop: "auto", marginBottom: "auto"}}>Search Users:</h1>
                    <input onChange = {(e) => filterUser(e)} id = "filterUser" style = {{"width": "15rem", "height": "1.5rem", "marginRight": "0.2rem"}}/>
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