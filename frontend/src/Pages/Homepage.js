import {useState,useEffect} from "react"
import './Homepage.css'
import LocationPicker from '../components/LocationPicker'
import MapPicker from '../components/MapPicker'
import { Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';

function Homepage(props){

  const user = props.parentUser
  const setUser = props.parentSetUser
  const [cookies,setCookie] = useCookies(['token']);
  const [useDropLocations, setDropLocation] = useState(false)
  const [dropBackColor, setDropBackColor] = useState('blue')
  const [mapBackColor, setMapBackColor] = useState('white')
  const [dropTextColor, setDropTextColor] = useState('white')
  const [mapTextColor, setMapTextColor] = useState('black')

  const location_set = () => {
    return user.from_location != ""
  }

  const changeBTN = () => {
    if (dropBackColor == 'white') {
      setDropBackColor('blue')
      setMapBackColor('white')
      setDropTextColor('white')
      setMapTextColor('black')
    }
    else {
      setDropBackColor('white')
      setMapBackColor('blue')
      setDropTextColor('black')
      setMapTextColor('white')
    }
  }

  return(
    <div>
      <div id = "masterDiv">
        <Button onClick = {() => (setDropLocation(!useDropLocations), changeBTN())} style = {{color: dropTextColor, backgroundColor: dropBackColor, width: "5rem", "height": "2rem", borderTopLeftRadius: "2vh", borderBottomLeftRadius: "2vh", borderTopRightRadius: "0vh", borderBottomRightRadius: "0vh"}} ><h1 style = {{marginTop: "auto", marginBottom: "auto", fontSize: "1rem"}}>Map</h1></Button>
        <Button onClick = {() => (setDropLocation(!useDropLocations), changeBTN())} style = {{color:mapTextColor, backgroundColor: mapBackColor, width: "5rem", "height": "2rem", borderTopLeftRadius: "0vh", borderBottomLeftRadius: "0vh", borderTopRightRadius: "2vh", borderBottomRightRadius: "2vh"}}><h1 style = {{marginTop: "auto", marginBottom: "auto", fontSize: "1rem"}}>List</h1></Button>
        <br/>
        {useDropLocations && <LocationPicker/>}
        {!useDropLocations && <MapPicker/>}
        <br/>
      </div> 
    </div>
  )
}

export default Homepage;