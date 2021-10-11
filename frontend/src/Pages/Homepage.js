import {useState,useEffect} from "react"
import './Homepage.css'
import LocationPicker from '../components/LocationPicker'
import { Button } from 'react-bootstrap'

function Homepage(props){

  const user = props.parentUser
  const setUser = props.parentSetUser

  const [useDropLocations, setDropLocation] = useState(true)

  const location_set = () => {
    return user.from_location != ""
  }

  useEffect (() => {
    console.log("PROPS", user)
  })

  return(
    <div>
      <div id = "masterDiv">
        <h1>Welcome to the Traveler Homepage</h1>
        <br/>
        {user.logged_in && <h1>Hello {user.name}!</h1>}
        <br/>
        <br/>
        {user.logged_in && location_set() && <p>You are from {user.from_location}</p>}
        {useDropLocations && <Button onClick = {() => setDropLocation(false)}>Toggle for map</Button>}
        {!useDropLocations && <Button onClick = {() => setDropLocation(true)}>Toggle for dropdown</Button>}
        {useDropLocations && <LocationPicker/>}
        {!useDropLocations && <h3>Map arriving soon</h3>}
        <br/>
      </div> 
    </div>
  )
}

export default Homepage;