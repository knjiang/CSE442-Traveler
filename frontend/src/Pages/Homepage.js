import {useState,useEffect} from "react"
import './Homepage.css'
import LocationPicker from '../components/LocationPicker'
import MapPicker from '../components/MapPicker'
import { Button } from 'react-bootstrap'

function Homepage(props){

  const user = props.parentUser
  const setUser = props.parentSetUser

  const [useDropLocations, setDropLocation] = useState(true)

  const location_set = () => {
    return user.from_location != ""
  }

  return(
    <div>
      <div id = "masterDiv">
        <h1>Welcome to the Traveler Homepage</h1>
        <br/>
        {user.logged_in && <h3>You are signed in as {user.name} from {user.from_location}</h3>}
        <br/>
        {useDropLocations && <Button style = {{"width": "10vw", "height": "10vh"}} onClick = {() => setDropLocation(false)}>Toggle for map</Button>}
        {!useDropLocations && <Button style = {{"width": "10vw", "height": "10vh"}} onClick = {() => setDropLocation(true)}>Toggle for dropdown</Button>}
        {useDropLocations && <LocationPicker/>}
        {!useDropLocations && <MapPicker/>}
        <br/>
      </div> 
    </div>
  )
}

export default Homepage;