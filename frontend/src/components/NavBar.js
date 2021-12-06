import {useEffect, useState} from "react"
import { useCookies } from 'react-cookie';
import { getProfile, getList, getUserList } from '../apis/profiles';
import { logoutBackend} from '../apis/auth';
import Login from '../components/Login';
import { Button, Offcanvas, Accordion } from 'react-bootstrap';
import './NavBar.css'
import LocationForm from "./LocationForm";
import { useHistory, Link } from "react-router-dom"; 
import { getFriends } from "../apis/friends"
import { getRecentChat } from "../apis/chat";

function NavBar(props){
    const [cookies,setCookie, removeCookie] = useCookies(['token']);
    const [listNames, setList] = useState()
    const [show, setShow] = useState(false);
    const [showUnlogged, setShowUnlogged] = useState(false);

    const [friends, setFriends] = useState([])
    const [recentChat, setRecentChat] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseUnlogged = () => setShowUnlogged(false);
    const handleShowUnlogged = () => setShowUnlogged(true);

    const user = props.parentUser
    const setUser = props.parentSetUser
  
    const history = useHistory()

    const location_set = () => {
      return user.from_location != ""
    }

    const logoutUser = () => {
      logoutBackend(cookies.token)
      .then(response => response.json())
      .then(data =>{
        removeCookie('token',{ path: '/' })
        setUser({
          logged_in : false,
          name: "None",
          email: "None",
        })
        history.push("/")
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    const fetchLists = () => {
      getList(cookies.token)
      .then(response => response.json())
      .then(data =>{
      if (!data.detail){
          data = data["lists"]
          setList(data)
          }
      })
    }

    const listDropDown = () => {
      if (listNames) {
        return (
          <div id = "dropdown" onMouseEnter = {() => fetchLists()}>
            <a href = '/my-lists'><Button style = {{width: "7.5rem"}}  id = "dropbtn" onMouseEnter = {() => fetchLists()}><h1 id = "buttonText">My Lists</h1></Button></a>
            <div id="dropdown-content">
              {listNames.map((item) => 
              <Link style = {{"font-size": "0.85rem", maxWidth: "20rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}
                to={{
                  pathname: "/my-lists",
                  state: item
                }}
              >{item}</Link>)}
            </div>
          </div>
        )
      }
      else {
        return (
          <div id = "dropdown"  onMouseEnter = {() => fetchLists()}>
            <a href = '/my-lists'><Button id = "dropbtn"><h1 id = "buttonText">My Lists</h1></Button></a>
            <div id="dropdown-content">
              <a>No existing lists, click to create one</a>
            </div>
          </div>
        )
      }
    }

    const fetchSideBar = () => {
      getFriends(cookies.token)
      .then(response => response.json())
      .then(data =>{
        setFriends(data["friends_list"])
      })
      getUserList()
      .then(response => response.json())
      .then(data =>{
        setAllUsers(data["users"])
      })
      getRecentChat(cookies.token)
      .then(response => response.json())
      .then(data =>{
        setRecentChat(data)
      })
    }


    const fetchSideBarUnlogged = () => {
      getUserList()
      .then(response => response.json())
      .then(data =>{
        setAllUsers(data["users"])
      })
    }

    const showFriends = () => {
      let res = []
      if (friends.length > 0) {
        for (let m of friends) {
          if (filteredUsers.length == 0 || m.includes(document.getElementById('userSearch').value)){
              res.push(<div style = {{display: "flex", justifyContent: "space-between"}}><a href = {'/user/' + m} style = {{textDecoration: "none", color: "black", maxWidth: "22rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{m}</a><Link to = {{pathname: '/messages/', state: {"type": "email", "user": m} }} ><i class="bi bi-envelope-plus" style = {{fontSize: "1.1rem", cursor: "pointer"}}></i></Link></div>)
          }
        }
      }
      return (res)
    }

    const showAllUsers = () => {
      let res = []
      if (allUsers.length > 0) {
        if (user.logged_in) {
          for (let m of allUsers) {
            if ((filteredUsers.length == 0 || m.includes(document.getElementById('userSearch').value)) && m != user.email){
              res.push(<div style = {{display: "flex", justifyContent: "space-between"}}><a href = {'/user/' + m} style = {{textDecoration: "none", color: "black", maxWidth: "22rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{m}</a><Link to = {{pathname: '/messages/', state: {"type": "email", "user": m} }} ><i class="bi bi-envelope-plus" style = {{fontSize: "1.1rem", cursor: "pointer"}}></i></Link></div>)
            }  
          }
        }
        else {
          for (let m of allUsers) {
            if ((filteredUsers.length == 0 || m.includes(document.getElementById('userSearch').value)) && m != user.email){
              res.push(<div style = {{display: "flex", justifyContent: "space-between"}}><a href = {'/user/' + m} style = {{textDecoration: "none", color: "black", maxWidth: "22rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{m}</a><Link to = {{pathname: '/messages/', state: {"type": "email", "user": m} }} ></Link></div>)
            }  
          }
        }
      }
      return (res)
    }

    const showRecentChat = () => {
      let res = []
      if (recentChat.length > 0) {
        for (let m of recentChat) {
          let title = ''
          if (!m['nameChanged']){
              title = m['users'].filter(item => item !== user.email).join()
          }
          else {
              title = m['name']
          }
          if ((filteredUsers.length == 0 || title.includes(document.getElementById('userSearch').value)) && title != user.email){
            if (m.type == "Single") {
              res.push(<div style = {{display: "flex", justifyContent: "space-between"}}><a href = {'/user/' + title} style = {{textDecoration: "none", color: "black", maxWidth: "22rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{title}</a><Link to = {{pathname: '/messages/', state: {"type": "email", "user": title} }} ><i class="bi bi-envelope-plus" style = {{fontSize: "1.1rem", cursor: "pointer"}}></i></Link></div>)
            }
            else {
              res.push(<div style = {{display: "flex", justifyContent: "space-between"}}><a style = {{textDecoration: "none", color: "black", maxWidth: "22rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{title}</a><Link to = {{pathname: '/messages/', state: {"type": "id", "user": m.id} }} ><i class="bi bi-envelope-plus" style = {{fontSize: "1.1rem", cursor: "pointer"}}></i></Link></div>)
            }
          }  
        }
      }
      return (res)
    }
    
    if (user.logged_in){
      return(
        <div>
            <div id = "NavBar">
            <Offcanvas show={show} onHide={handleClose} placement = "end">
              <Offcanvas.Header closeButton>
              </Offcanvas.Header>

              <input onChange = {() => setFilteredUsers(document.getElementById('userSearch').value)} id = 'userSearch' placeholder = "Search Users"/>
              
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Friends</Accordion.Header>
                  <Accordion.Body>
                    {showFriends()}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Recent Chats</Accordion.Header>
                  <Accordion.Body>
                    {showRecentChat()}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>All users</Accordion.Header>
                  <Accordion.Body>
                    {showAllUsers()}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Offcanvas>

              {user.logged_in && !location_set() && <LocationForm/>}
                <div id = "leftNav"><a href = "/" id = "travelerIcon">Traveler</a></div>
                <div id = "rightNav" style = {{display: "flex", justifyContent: 'end'}}>
                  <a href = '/friends'><Button id = "navButtonOn" variant="outline-dark"><h1 id = "buttonText">Notifications</h1></Button></a>
                  <a href = '/messages'><Button id = "navButtonOn" variant="outline-dark"><h1 id = "buttonText">Messages</h1></Button></a>
                  <a href = '/my-forum'><Button id = "navButtonOn" variant="outline-dark"><h1 id = "buttonText">My Forums</h1></Button></a>
                  {listDropDown()}
                  <a href = '/my-profile'><Button id = "navButtonOn" variant="outline-dark"><h1 id = "buttonText">My Profile</h1></Button></a>
                  <a onClick={() => (handleShow(), fetchSideBar())}><Button variant="outline-dark" id = "navButtonOn"><h1 id = "buttonText">Users</h1></Button></a>
                  <a href = '/forum'><Button variant="outline-dark" id = "navButtonOn"><h1 id = "buttonText">Forum</h1></Button></a>
                  <Button id = "navButtonOn" variant="outline-dark" onClick = {logoutUser} style = {{"paddingLeft": "1.25vw", height: "3rem", marginTop: "-0vh"}}><h1 id = "buttonText">Logout</h1></Button>
                </div>
            </div>
        </div>
      )
    }
    else{
      return(
        <div>
            <Offcanvas show={showUnlogged} onHide={handleCloseUnlogged} placement = "end">
              <Offcanvas.Header closeButton>
              </Offcanvas.Header>

              <input onChange = {() => setFilteredUsers(document.getElementById('userSearch').value)} id = 'userSearch' placeholder = "Search Users"/>
              
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>AllUsers</Accordion.Header>
                  <Accordion.Body>
                    {showAllUsers()}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            </Offcanvas>

            <div id = "NavBar">
                <div id = "leftNav"><a href = "/" id = "travelerIcon">Traveler</a></div>
                <div id = "rightNav" style = {{display: "flex", justifyContent: 'end'}}>
                  <a ><Button id = "navButtonOff" variant="outline-dark"><h1 id = "buttonText">Notifications</h1></Button></a>
                  <a ><Button id = "navButtonOff" variant="outline-dark"><h1 id = "buttonText">Messages</h1></Button></a>
                  <a ><Button id = "navButtonOff" variant="outline-dark"><h1 id = "buttonText">My Forums</h1></Button></a>
                  <a><Button variant="outline-dark" id = "navButtonOff"><h1 id = "buttonText">My Lists</h1></Button></a>
                  <a><Button id = "navButtonOff" variant="outline-dark"><h1 id = "buttonText">My Profile</h1></Button></a>
                  <a onClick={() => (handleShowUnlogged(), fetchSideBarUnlogged())}><Button variant="outline-dark" id = "navButtonOn"><h1 id = "buttonText">Users</h1></Button></a>
                  <a href = '/forum'><Button variant="outline-dark" id = "navButtonOn" title="forum button"><h1 id = "buttonText">Forum</h1></Button></a>
                  <a style = {{width: "7.5rem", marginTop: "0.3rem"}}><Login /></a>
                </div>
            </div>
        </div>
      )
    }
  }
  
  export default NavBar;