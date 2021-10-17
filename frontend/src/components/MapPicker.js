import {useState,useEffect} from "react"
import { DropdownButton, Dropdown } from 'react-bootstrap'
import WorldMap from 'react-world-map'
import { useHistory } from 'react-router-dom'

function MapPicker() {

    let mapObj = {"na":"North America", "sa":"South America", "af":"Africa", "eu":"Europe", "as":"Asia", "oc":"Oceania"}
    const history = useHistory()

    return (
      <div style = {{"width": "100%"}}>
        <div style = {{"margin-left": "auto", "margin-right": "auto", "textAlign": "center"}}>
            <WorldMap onSelect={ (e) => history.push('/locations/' + mapObj[e].trim().replace(' ', '-')) } />
        </div>
      </div>
    )
}

export default MapPicker;