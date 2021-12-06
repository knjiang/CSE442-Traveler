import {useState,useEffect} from "react"
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { getLocation } from "../apis/locations"
import { useCookies } from 'react-cookie';

function LocationPicker() {

  const [location, setLocation] = useState({
    location: []
  })

  useEffect(() => {
    getLocation()
    .then(response => response.json())
    .then(data => {
      if (data){
        setLocation({location: (data.map(({id, name}) => name))})
      }
    })
  }, [])

  const locations_dropDown = () => {
      if (location){
        return(
          <DropdownButton id="dropdown-basic-button-homepage" title="Choose your location">
            <div id = "dropDiv">
            {location.location.map((locations, index) => (
                    <Dropdown.Item id = "dropdown-item-homepage" style = {{"width": "14.2rem", "textAlign": "center"}} href = {'/locations/' + locations.replace(/ /g, '-')}>{locations}</Dropdown.Item>
              ))}
              </div>

            </DropdownButton>
        )
      }
      else {
        return (
          <DropdownButton id="dropdown-basic-button-homepage" title="Choose your location">
          </DropdownButton>
        )
      }
    }

    
    return (
      <div style = {{"width": "100%"}}>
        <div style = {{"margin-left": "auto", "margin-right": "auto", "textAlign": "center"}}>
        {locations_dropDown()}
        </div>
      </div>
    )
}

export default LocationPicker;