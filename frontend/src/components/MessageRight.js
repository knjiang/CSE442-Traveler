import {useState,useEffect} from "react"
import { Button, Modal, Dropdown } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { getUserList } from '../apis/profiles';
import { createChat, removeFromGroupChat, addToGroupChat } from '../apis/chat'

function MessageRight(props) {

    const user = props.user
    const setAllUsers = props.setAllUsers
    const allUsers = props.allUsers
    const userPeek = props.userPeek
    const setUserPeek = props.setUserPeek
    const selectedUser = props.selectedUser
    const setSelectedUser = props.setSelectedUser
    const selectedMessages = props.selectedMessages //All messages for selected individual [message, from, to]
    const setSelectedMessages = props.setSelectedMessages 
    const ws = props.ws
    const newChat = props.newChat
    const setNewChat = props.setNewChat
    const cookies = props.cookies
    const recipents = props.recipents
    const setRecipents = props.setRecipents
    const [filterRecipents, setFilterRecipents] = useState("")
    const [allEmails, setAllEmails] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showMessages = () => {
        let res = []
        let log = selectedMessages.messages ? selectedMessages.messages : []
        for (let u of log){
            let sender = u['sender']
            let message = u['message']
            if (sender != user.email){
                res.push(<div id = "dmFrom"><Link to = {{pathname: '/user/' + sender, state: {"name": sender} }} id = "userLogoFrom" >{sender.substring(0, 3)}</Link><h1 id = "messageTextFrom">{message}</h1></div>)
            }
            else {
                res.push(<div id = "dmTo"><h1 id = "messageTextTo">{message}</h1><Link to = {{pathname: '/user/' + user.email, state: {"name": user.email} }} id = "userLogoTo">{user.email.substring(0, 3)}</Link></div>)
            }
        }

/*             if (from == user.email){
                res.push(<div id = "dmFrom"><Link to = {{pathname: '/user/' + from, state: {"name": from} }} id = "userLogoFrom" >{from.substring(0, 3)}</Link><h1 id = "messageTextFrom">{message}</h1></div>)
            }
            else {
                res.push(<div id = "dmTo"><h1 id = "messageTextTo">{message}</h1><Link to = {{pathname: '/user/' + from, state: {"name": from} }} id = "userLogoTo">{from.substring(0, 3)}</Link></div>)
            } */
        return (
            <div id= "messagesList">
                {res}
            </div>
        )
    }

    useEffect (() => {
        if (setSelectedMessages && !newChat){
            var objDiv = document.getElementById("messagesList");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    })

    useEffect (() => {
        getUserList()
        .then(response => response.json())
        .then(data => {
            setAllEmails(data.users)
        })
    }, [])

    const inputSubmitter = () => {
        let m = document.getElementById("inputMessage").value
        if (m.length > 0){
            let payload = ({
                "status": "send",
                "from": user.email,
                "info": selectedUser,
                "message": m,
                'new': false
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

    const inputSubmitterNew = () => {
        let m = document.getElementById("inputMessage").value
        if (m != '' && recipents.length > 0){
            createChat(cookies.token, recipents, m)
            .then(response => response.json())
            .then(data => {
                let title = ''
                if (!data['nameChanged']){
                    title = data['users'].filter(item => item !== user.email).join()
                }
                else {
                    title = data['name']
                }
                if (data['new']){
                    if (data['users'].length == 2){
                        //DM
                        let info = {
                            "id": data['id'],
                            "users": data['users'].filter(item => item !== user.email),
                            "name": data['name'],
                            "type": "Single",
                            "messages": data['message'],
                            "nameChanged": data['nameChanged']
                        }
                        setAllUsers(re => [info, ...re])
                        setSelectedUser({"id": data['id'], users: data['users'], name: title})
                        setNewChat(false)
                        let payload = ({
                            "status": "send",
                            "from": user.email,
                            "info": {"id": data['id'], users: data['users'], name: title},
                            "message": data['message'],
                            'new': true,
                          })
                          ws.send(JSON.stringify(payload))
                          document.getElementById("inputMessage").value = ""
                    }
                    else {
                        let info = {
                            "id": data['id'],
                            "users": data['users'].filter(item => item !== user.email),
                            "name": data['name'],
                            "type": "Group",
                            "messages": data['message'],
                            "nameChanged": data['nameChanged'] 
                        }
                        setAllUsers(re => [info, ...re])
                        setSelectedUser({"id": data['id'], users: data['users'], name: title})
                        setNewChat(false)
                        let payload = ({
                            "status": "send",
                            "from": user.email,
                            "info": {"id": data['id'], users: data['users'], name: title},
                            "message": data['message'],
                            'new': true
                          })
                          ws.send(JSON.stringify(payload))
                          document.getElementById("inputMessage").value = ""
                    }
                }
                else {
                    setSelectedUser({"id": data['id'], users: data['users'], name: title})
                    setNewChat(false)
                    let payload = ({
                        "status": "send",
                        "from": user.email,
                        "info": {"id": data['id'], users: data['users'], name: title},
                        "message": data['message'],
                        'new': false
                      })
                      ws.send(JSON.stringify(payload))
                      document.getElementById("inputMessage").value = ""
                }
            })
            document.getElementById("inputMessage").value = ''
        }
    }

    const inputTyperNew = () => {
        return (
            <div id = "messageInput">
            <form onSubmit = {(e) => (e.preventDefault(), inputSubmitterNew())}>
                <input id = "inputMessage"/><Button onClick = {() => inputSubmitterNew()}>Send</Button>
             </form>   
            </div>

        )
    }

    const sendUsers = () => {
        let res = []
        for (let u of allEmails){
            if ((u.includes(filterRecipents) || filterRecipents.value ==  "")){
                if (!recipents.includes(u) && u != user.email) {
                    res.push(<Dropdown.Item style = {{justifyContent: "center"}} onClick = {() => setRecipents(re => [...re, u])}>{u}</Dropdown.Item>)
                }
            }
        }
        return (
            <Dropdown.Menu style = {{justifyContent: "center", width: "60%", marginLeft: "2.5rem", maxHeight: "15rem", overflowY: "auto"}}>
                {res}
            </Dropdown.Menu>
        )
    }

    const addFilteredUsers = () => {
        let res = []
        for (let u of allEmails){
            if ((u.includes(filterRecipents) || filterRecipents.value ==  "" ) && selectedUser){
                if (!recipents.includes(u) && u != user.email) {
                    if (!selectedUser.users.includes(u)){
                        res.push(<Dropdown.Item style = {{justifyContent: "center"}} onClick = {() => (setRecipents(re => [...re, u]))}>{u}</Dropdown.Item>)
                    }
                }
            }
        }
        return (
            <Dropdown.Menu style = {{justifyContent: "center", width: "60%", marginLeft: "2.5rem", maxHeight: "15rem", overflowY: "auto"}}>
                {res}
            </Dropdown.Menu>
        )
    }

    const removeRecipent = (u) => {
        let res = recipents.filter(item => item !== u)
        setRecipents(res)
    }

    const linkUsers = () => {
        let res = []
        for (let u of recipents){
            res.push(<div style = {{fontSize: "1rem", marginRight: "1rem"}}><a style = {{color: "black", textDecoration: "none", border: "0.1rem solid gray", borderRadius: "0.5rem", padding: "0.25rem 0.5rem 0.25rem 0.5rem"}} href = {'/user/' + u}>{u}</a><i onClick = {() => removeRecipent(u)}style = {{fontSize: "1.25rem", color: "red", cursor: "pointer"}} class="bi bi-dash-circle"></i></div>)
        }
        return (
            <div style = {{display: "grid", width: "90%", maxWidth: "90%", height: "10rem", margin: "auto", overflowY: "auto", gridTemplateColumns: "repeat(2, 0.5fr)"}}>
                {res}
            </div>
        )
    }

    const returnMembers = () => {
        let res = []
        {selectedUser.type == "Group" && res.push(<Dropdown.Item onClick={() => (handleShow(), setRecipents(''))} style = {{display: "flex", justifyContent: "space-between"}}>Add members <i style = {{padding: "0.10rem 0.35rem 0.10rem 0.35rem"}} class="bi bi-person-plus-fill"></i></Dropdown.Item>)}
        res.push(<Dropdown.Divider />)
        for (let m of selectedUser.users){
            if (m != user.email){
                let link = '/user/' + m
                res.push(<Dropdown.Item style = {{display: "flex", justifyContent: "space-between"}}><h3 style = {{fontSize: "1rem", marginRight: "0.25rem", marginTop: "auto", marginBottom: "auto"}} href = {link}>{m}</h3> <i onClick = {() => (removeFromGroupChat(cookies.token, m, selectedUser.id), window.location.reload())} id = "icon" class="bi bi-person-dash-fill"></i></Dropdown.Item>)
            }
        }
        res.push(<Dropdown.Item style = {{display: "flex", justifyContent: "space-between"}}>{user.email}<i onClick = {() => (removeFromGroupChat(cookies.token, user.email, selectedUser.id), window.location.reload())} id = "icon" class="bi bi-person-dash-fill"></i></Dropdown.Item>)
        return (
            <Dropdown.Menu>
                {res}
            </Dropdown.Menu>
        )
    }

    const addMembers = () => {
        return (
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add users</Modal.Title>
            </Modal.Header>
                    <div style = {{fontSize: "1rem", display: "flex", justifyContent: "center", height: "20rem"}}>
                        <Dropdown autoClose="outside" show = {true}>
                            <Dropdown.Toggle id="dropdown-basic" style = {{border: "none", backgroundColor: "white", color: "black"}} onClick = {() => document.getElementById("recipents").focus()}>
                                To: <input onChange = {() => (setFilterRecipents(document.getElementById("recipents").value))} id = "recipents" style = {{width: "20rem"}} placeholder = "Type in the email of recipents" />
                            </Dropdown.Toggle>
                            {addFilteredUsers()}
                        </Dropdown>
                    </div>
                    {linkUsers()}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => (handleClose(), addToGroupChat(cookies.token, recipents, selectedUser.id), window.location.reload())}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )
    }

    return (
      <div id = "rightMessageWrapper">
          {addMembers()}
          {!newChat && <div>
            {selectedUser && <div style = {{marginLeft: "auto", marginRight: "auto", display: "flex"}}><h3 style = {{"fontSize": "2.5vh", "textAlign": "center",  fontWeight:"800", width: "45vw", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>Showing messages with {selectedUser.name}</h3>
            <Dropdown drop = "start">
                <Dropdown.Toggle style = {{border: "none", backgroundColor: "white"}}>
                    <i class="bi bi-person-lines-fill" style = {{color: "black"}}>Members</i>
                </Dropdown.Toggle>
                {returnMembers()}
            </Dropdown>
            </div>}
            {showMessages()}  
            {selectedUser && inputTyper()}
          </div>}
          {newChat && <div >
                <div style = {{fontSize: "1rem", display: "flex", justifyContent: "center", height: "20rem"}}>
                    <Dropdown autoClose="outside" show = {true}>
                        <Dropdown.Toggle id="dropdown-basic" style = {{border: "none", backgroundColor: "white", color: "black"}} onClick = {() => document.getElementById("recipents").focus()}>
                            To: <input onChange = {() => (setFilterRecipents(document.getElementById("recipents").value))} id = "recipents" style = {{width: "40rem"}} placeholder = "Type in the email of recipents" />
                        </Dropdown.Toggle>

                        {sendUsers()}

                    </Dropdown>
                </div>
                <div>
                    {linkUsers()}
                    {inputTyperNew()}
                </div>
            </div>}

      </div>
    )
}

export default MessageRight;