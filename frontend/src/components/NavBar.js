import {useEffect} from "react"
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import { logoutBackend} from '../apis/auth';
import Login from '../components/Login';
import { Button } from 'react-bootstrap';
import './NavBar.css'
import { Link } from 'react-router-dom'
import LocationForm from "./LocationForm";

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
          <div id = "NavBar">
              <div id = "leftNav"><a href = "/" id = "travelerIcon">Traveler</a></div>
              <div id = "rightNav">
                <Button variant="outline-dark" id = "navButton" title="forum button"><Link id = "linkButton" to = "/forum">Forum</Link></Button>
                <Button variant="outline-dark" id = "navButton"><Link id = "linkButton" to = "/">Homepage</Link></Button>
                {user.logged_in && <Button id = "navButton" variant="outline-dark"><Link id = "linkButton" to = "/my-profile">My Profile</Link></Button>}
                {!user.logged_in && <Button id = "navButton" variant="outline-dark" style = {{padding: "0px"}}><Login/></Button>}
                {user.logged_in && <Button id = "navButton" variant="outline-dark" onClick = {logoutUser}>Logout</Button>}
                {user.logged_in && !location_set() && <LocationForm/>}
              </div>
          </div>

      </div>
    )
  }
  
  export default NavBar;