import {useState,useEffect} from "react"
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { addLocation } from '../apis/locations'

function MapPicker() {

    let mapObj = {"na":"North America", "sa":"South America", "af":"Africa", "eu":"Europe", "as":"Asia", "oc":"Oceania"}
    const history = useHistory()
    const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

    const newPath = (e) => { 
      history.push('/locations/' + e.replace(/ /g, "-")) 
    }

    return (
      <div id = "mapWrapper" style = {{"width": "80%", "marginLeft":"auto", "marginRight": "auto", "height": "100vh", "zIndex":"-1", marginTop: "1vh"}}>
        <div style = {{"margin-left": "auto", "margin-right": "auto", "textAlign": "center", "height": "80rem"}}>
          <ComposableMap style = {{ "marginTop": "-14vh", "preserveAspectRatio":"none", "maxHeight": "80rem", "width": "60rem", "transform": "scale(1, 0.8)"}}>
            <Geographies geography={geoUrl} style = {{"cursor":"pointer","transform": "scale(1, 1)", "preserveAspectRatio":"none"}}>
              {({ geographies }) => ( 
                geographies.map(geo => 
                <Geography style={{
                  default: {
                    fill: "white",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "black"
                  },
                  hover: {
                    fill: "rgb(0, 76, 190)",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none"
                  },
                  pressed: {
                    fill: "#FF5722",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none"
                  }
                }} id = "geoPlace" key={geo.rsmKey} geography={geo} onClick={ () => newPath(geo.properties.NAME)}/>))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    )
}

export default MapPicker;