import {useEffect} from "react"
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import { logoutBackend} from '../apis/auth';
import Login from '../components/Login';
import { Button } from 'react-bootstrap';
import './NavBar.css'
import LocationForm from "./LocationForm";
import { useHistory } from "react-router-dom";

function NavBar(props){
    const [cookies,setCookie, removeCookie] = useCookies(['token']);

    const user = props.parentUser
    const setUser = props.parentSetUser
  
    const history = useHistory()

    useEffect(() => {
      if (cookies.token && !user.logged_in){
        getProfile(cookies.token)
        .then(response => response.json())
        .then(data => {
          if (!data.detail){
            let newUser = 
            setUser({
              logged_in: true,
              name: data.first_name,
              email: data.email,
              from_location: data.from_location
            })
          }
        })
      }
    }, [])

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
  
  
    return(
      <div>
          <div id = "NavBar">
              <div id = "leftNav"><a href = "/" id = "travelerIcon">Traveler</a></div>
              <div id = "rightNav">
                {user.logged_in && <a href = '/my-lists'><Button variant="outline-dark" id = "navButton"><h1 id = "buttonText">My lists</h1></Button></a>}
                {user.logged_in && <a href = '/my-profile'><Button id = "navButton" variant="outline-dark"><h1 id = "buttonText">My Profile</h1></Button></a>}
                {!user.logged_in &&<Button id = "navButton" variant="outline-dark" style = {{padding: "0px"}}><Login/></Button>}
                {user.logged_in && <Button id = "navButton" variant="outline-dark" onClick = {logoutUser}><h1 id = "buttonText">Logout</h1></Button>}
                {user.logged_in && !location_set() && <LocationForm/>}
                <a href = '/search'><Button variant="outline-dark" id = "navButton" title="forum button"><h1 id = "buttonText">Search Users</h1></Button></a>
                <a href = '/forum'><Button variant="outline-dark" id = "navButton" title="forum button"><h1 id = "buttonText">Forum</h1></Button></a>
              </div>
          </div>
      </div>
    )
  }
  
  export default NavBar;