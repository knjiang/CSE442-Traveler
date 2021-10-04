import { useEffect, useState } from "react"
import { getLocation } from "../apis/locations";
import { changeList, getList } from '../apis/profiles';
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import NavBar from '../components/NavBar'
import SaveLocationtoList from "../components/SaveLocationToList";
import LocationForm from "../components/LocationForm";

/*This is the page that shows the location the user clicked*/

function Specific_Location (props) {

  const [currentLocation,setLocation] = useState(false)

  const [realLocation,setReal] = useState(false)

  const [savedLists,setLists] = useState([])

  const [cookies,setCookie, removeCookie] = useCookies(['token']);

  const [location, setTempLocation] = useState({
    location: []
  })

  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
    from_location: "",
    search_query: '',
  })

  useEffect (() => {
    if (!currentLocation){
      const pathname = props.location.pathname.substr(11)
      if (pathname){
        setLocation(pathname)
      }
      
    }
    else{
      getLocation()
      .then(response => response.json())
      .then(data => {
        if (data){
          let realLocations = (data.map(({id, name}) => name))
          if (realLocations.includes(currentLocation)){
            setReal(true)
          }
        }
      })
    }
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

  const check_location = props.location.pathname.slice(0, 10);
  if (check_location == '/locations' && currentLocation && realLocation) {
    return(
      <div>
        <NavBar parentUser = {user} parentSetUser = {setUser}/>
          <h1>Welcome to {currentLocation}</h1>
          {user.logged_in && <button>Save to list</button>}
          <Link to = '/'><button>Homepage</button></Link>
          <SaveLocationtoList parentCurrentLocation = {currentLocation} parentCookies = {cookies} parentUser = {user}/>
  
      </div>
      )
  }
  else{
    return(<h1>The following page does not exist, please check your spelling</h1>)
  }

}

export default Specific_Location 