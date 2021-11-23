import { useEffect, useState, useRef } from "react";
import { getLocation, addLocation, delLocation } from "../apis/locations";
import { Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie';
import {reset} from '../apis/profiles'
import {createChat, addToGroupChat} from '../apis/chat'

/*This is the page that shows the location the user clicked*/

function AdminAddLocation () {

    const [location, setLocation] = useState({
        location: []
      })

    const [localName, setLocalName] = useState()
    const [cookies,setCookie] = useCookies(['token']);
    const allCountries = [
        "Afghanistan",
        "Angola",
        "Albania",
        "United Arab Emirates",
        "Argentina",
        "Armenia",
        "Antarctica",
        "Fr. S. Antarctic Lands",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Burundi",
        "Belgium",
        "Benin",
        "Burkina Faso",
        "Bangladesh",
        "Bulgaria",
        "Bahamas",
        "Bosnia and Herz.",
        "Belarus",
        "Belize",
        "Bolivia",
        "Brazil",
        "Brunei",
        "Bhutan",
        "Botswana",
        "Central African Rep.",
        "Canada",
        "Switzerland",
        "Chile",
        "China",
        "Côte d'Ivoire",
        "Cameroon",
        "Dem. Rep. Congo",
        "Congo",
        "Colombia",
        "Costa Rica",
        "Cuba",
        "N. Cyprus",
        "Cyprus",
        "Czechia",
        "Germany",
        "Djibouti",
        "Denmark",
        "Dominican Rep.",
        "Algeria",
        "Ecuador",
        "Egypt",
        "Eritrea",
        "Spain",
        "Estonia",
        "Ethiopia",
        "Finland",
        "Fiji",
        "Falkland Is.",
        "France",
        "Gabon",
        "United Kingdom",
        "Georgia",
        "Ghana",
        "Guinea",
        "Gambia",
        "Guinea-Bissau",
        "Eq. Guinea",
        "Greece",
        "Greenland",
        "Guatemala",
        "Guyana",
        "Honduras",
        "Croatia",
        "Haiti",
        "Hungary",
        "Indonesia",
        "India",
        "Ireland",
        "Iran",
        "Iraq",
        "Iceland",
        "Israel",
        "Italy",
        "Jamaica",
        "Jordan",
        "Japan",
        "Kazakhstan",
        "Kenya",
        "Kyrgyzstan",
        "Cambodia",
        "South Korea",
        "Kosovo",
        "Kuwait",
        "Laos",
        "Lebanon",
        "Liberia",
        "Libya",
        "Sri Lanka",
        "Lesotho",
        "Lithuania",
        "Luxembourg",
        "Latvia",
        "Morocco",
        "Moldova",
        "Madagascar",
        "Mexico",
        "Macedonia",
        "Mali",
        "Myanmar",
        "Montenegro",
        "Mongolia",
        "Mozambique",
        "Mauritania",
        "Malawi",
        "Malaysia",
        "Namibia",
        "New Caledonia",
        "Niger",
        "Nigeria",
        "Nicaragua",
        "Netherlands",
        "Norway",
        "Nepal",
        "New Zealand",
        "Oman",
        "Pakistan",
        "Panama",
        "Peru",
        "Philippines",
        "Papua New Guinea",
        "Poland",
        "Puerto Rico",
        "North Korea",
        "Portugal",
        "Paraguay",
        "Palestine",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "W. Sahara",
        "Saudi Arabia",
        "Sudan",
        "S. Sudan",
        "Senegal",
        "Solomon Is.",
        "Sierra Leone",
        "El Salvador",
        "Somaliland",
        "Somalia",
        "Serbia",
        "Suriname",
        "Slovakia",
        "Slovenia",
        "Sweden",
        "Swaziland",
        "Syria",
        "Chad",
        "Togo",
        "Thailand",
        "Tajikistan",
        "Turkmenistan",
        "Timor-Leste",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Taiwan",
        "Tanzania",
        "Uganda",
        "Ukraine",
        "Uruguay",
        "United States of America",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Vanuatu",
        "Yemen",
        "South Africa",
        "Zambia",
        "Zimbabwe"
      ]
    
    useEffect(() => {
        getLocation()
        .then(response => response.json())
        .then(data => {
            if (data){
            setLocation({location: (data.map(({id, name}) => name))})
            }
        })
    }, [])

    const setName = (e) => {
        e.preventDefault()
        if (localName) {
            addLocation(JSON.stringify(localName))
        }
        setLocalName()
        getLocation()
        .then(response => response.json())
        .then(data => {
            if (data){
            setLocation({location: (data.map(({id, name}) => name))})
            }
        })
    }

    const setAllName = (e) => {
        e.preventDefault()
        addLocation(JSON.stringify(allCountries))
        getLocation()
        .then(response => response.json())
        .then(data => {
            if (data){
            setLocation({location: (data.map(({id, name}) => name))})
            }
        })
    }

    const delName = (e, con) => {
        e.preventDefault()
        delLocation(con)
        setLocalName()
        getLocation()
        .then(response => response.json())
        .then(data => {
            if (data){
            setLocation({location: (data.map(({id, name}) => name))})
            }
        })
    }

    const returnLocation = () => {
        let res = []
        for (let con of location["location"]){
            res.push(<h3 >{con},<Button onClick = {(e) => delName(e, con)}>Delete</Button></h3>)
        }
        return (<div style = {{"display":"flex"}}>{res}</div>)
    }

    const deleteAllM = () => {
      reset(cookies.token, "message")
    }

    const resetAll = () => {
        reset(cookies.token, "all")
    }
  
    const deleteAllLocations = () => {
        delLocation("AllExistingLocations")
    }

    const createGC = () => {
        createChat(cookies.token, ['huangbaron2@gmail.com'])
    }

    const addToGC = () => {
        addToGroupChat(cookies.token, ['312baron@gmail.com'], 0)
    }

    return(
        <div>
            <br/>
            <h3>Current available locations are: </h3>
            {returnLocation()}
            <br/>
            <form style = {{"textAlign":"center"}}>
                Enter location name
                <input type = "text" onChange = {(e) => setLocalName(e.target.value)}></input>
                <button onClick = {(e) => setName(e)}>Add</button>
                <button onClick = {(e) => setAllName(e)}>Add all countries</button>
            </form>
            <button style = {{"width": "7vw", "backgroundColor": "pink", "textAlign": "center"}} onClick = {() => deleteAllLocations()}>DELETE ALL LOCATIONS</button>
            <button style = {{"width": "7vw", "backgroundColor": "pink", "textAlign": "center"}} onClick = {() => deleteAllM()}>DELETE ALL MESSAGES</button>
            <button style = {{"width": "7vw", "backgroundColor": "red", "textAlign": "center", color: "white"}} onClick = {() => resetAll()}>RESET ALL</button>
            <button style = {{"width": "7vw", "textAlign": "center"}} onClick = {() => createGC()}>Create new group chat (hardcoded so dont press)</button>
            <button style = {{"width": "7vw", "textAlign": "center"}} onClick = {() => addToGC()}>Add to GC (hardcoded so dont press)</button>
        </div>
    )
}

export default AdminAddLocation;