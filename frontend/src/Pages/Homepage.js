import {useState,useEffect} from "react"
import './Homepage.css'
import Login from '../components/Login';
import { useCookies } from 'react-cookie';
import { logoutBackend} from '../apis/auth';
import { getProfile } from '../apis/profiles';
import LocationForm from "../components/LocationForm";
import NavBar from '../components/NavBar'
import LocationPicker from '../components/LocationPicker'

function Homepage(){
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
    from_location: "",
    search_query: '',
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

  return(
    <div>
      <NavBar parentUser = {user} parentSetUser = {setUser}/>
      <h1>Welcome to the Traveler Homepage</h1>
      <br/>
      {user.logged_in && <h1>Hello {user.name}!</h1>}
      <br/>
      <br/>
      {user.logged_in && location_set() && <p>You are from {user.from_location}</p>}
      <LocationPicker/>
      <br/>

    </div>
  )
}

export default Homepage;