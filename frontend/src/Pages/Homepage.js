import {useState,useEffect} from "react"
import './Homepage.css'
import { DropdownButton, Dropdown, Button } from 'react-bootstrap'
import Login from '../components/Login';
import { useCookies } from 'react-cookie';
<<<<<<< HEAD
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
=======

function Homepage(){
  const [cookies,setCookie, removeCookie] = useCookies(['token']);
  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
  })

  useEffect(() => {
    if (cookies.token && !user.logged_in){
      fetch("http://localhost:8000/dj-rest-auth/user",
                {
                    headers: {
                        'Authorization' : 'Token ' + cookies.token
                    },
                    method: "GET",
                })
>>>>>>> 3e1f2d283607283cee1a972783b8d0f9bc999b5a
      .then(response => response.json())
      .then(data => {
        setUser({
          logged_in: true,
          name: data.first_name,
<<<<<<< HEAD
          email: data.email,
          from_location: data.from_location
=======
          email: data.email
>>>>>>> 3e1f2d283607283cee1a972783b8d0f9bc999b5a
        })
      })
    }
  })
<<<<<<< HEAD

  const location_set = () => {
    return user.from_location != ""
  }

  const logoutUser = () => {
    logoutBackend(cookies.token)
=======

  const logoutUser = () => {
    fetch("http://localhost:8000/dj-rest-auth/logout/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Token ' + cookies.token
        },
        method: "POST",
    })
>>>>>>> 3e1f2d283607283cee1a972783b8d0f9bc999b5a
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
      <br/>
      {user.logged_in && <Button variant="outline-dark" onClick = {logoutUser}>
      Logout
      </Button>}
      {user.logged_in && <h1>Hello {user.name}!</h1>}
<<<<<<< HEAD
      <br/>
      <br/>
      {user.logged_in && !location_set() && <LocationForm/>}
      {user.logged_in && location_set() && <p>You are from {user.from_location}</p>}
=======
>>>>>>> 3e1f2d283607283cee1a972783b8d0f9bc999b5a
    </div>
  )
}

export default Homepage;