import {useState,useEffect} from "react"
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import { logoutBackend} from '../apis/auth';
import Login from '../components/Login';
import { Button } from 'react-bootstrap';
import './NavBar.css'
import { Link } from 'react-router-dom'

function NavBar(props){
    const [cookies,setCookie, removeCookie] = useCookies(['token']);

    const user = props.parentUser
    const setUser = props.parentSetUser
  
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
          <div id = "NavBar">
              <h1 style = {{"font-size": "3.5vh", "margin": "auto", "margin-left": "5vw"}}>Traveler</h1>
              <div id = "rightNav">
                <Button variant="outline-dark"><Link id = "linkButton" to = "/">Homepage</Link></Button>
                {!user.logged_in && <Login/>}
                {user.logged_in && <Button variant="outline-dark" onClick = {logoutUser}>Logout</Button>}
              </div>
          </div>

      </div>
    )
  }
  
  export default NavBar;