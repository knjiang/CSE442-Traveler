import {useState,useEffect} from "react"
import './Homepage.css'
import { DropdownButton, Dropdown, Button } from 'react-bootstrap'
import Login from '../components/Login';
import { useCookies } from 'react-cookie';
import { logoutBackend} from '../apis/auth';
import { getProfile } from '../apis/profiles';
import LocationForm from "../components/LocationForm";

function Homepage(){
  const [cookies,setCookie, removeCookie] = useCookies(['token']);

  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
    from_location: "",
  })

  useEffect(() => {
    if (cookies.token && !user.logged_in){
      getProfile(cookies.token)
      .then(response => response.json())
      .then(data => {
        if (!data.detail){
          setUser({
            logged_in: true,
            name: data.first_name,
            email: data.email,
            from_location: data.from_location
          })
        }
      })
    }
  })

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
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  return(
    <div>
      <h1>Welcome to the Traveler Homepage</h1>
      {!user.logged_in && <Login/>}
      <button id="forumButton" title="forum button"><a href = "/forum"> Forum Button </a></button>
      <br/>
      {user.logged_in && <Button variant="outline-dark" onClick = {logoutUser}>
      Logout
      </Button>}
      {user.logged_in && <h1>Hello {user.name}!</h1>}
      <br/>
      <br/>
      {user.logged_in && !location_set() && <LocationForm/>}
      {user.logged_in && location_set() && <p>You are from {user.from_location}</p>}
    </div>
  )
}

export default Homepage;