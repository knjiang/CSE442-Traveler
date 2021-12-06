import { useEffect, useState, useRef } from "react"
import { getLocation } from "../apis/locations";
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import NavBar from '../components/NavBar'
import SaveLocationtoList from "../components/SaveLocationToList";
import './Specific_Location.css'
import { Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/*This is the page that shows the location the user clicked*/

function Specific_Location (props) {

  const [currentLocation,setLocation] = useState(false)

  const [realLocation,setReal] = useState(false)

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const user = props.parentUser
  const setUser = props.parentSetUser 

  const [locationInfo, setLocationInfo] = useState()
  const [errorMsg, setErrorMsg] = useState(false)

  useEffect (() => {
    const pathname = window.location.pathname.substr(11)
    if (!currentLocation){
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
          if (realLocations.some(x => x.toLowerCase().replace(/ /g, '') == currentLocation.replace(/-/g, '').toLowerCase())){
            setReal(true)
          }
        }
      })
    }
    let spaceIndex = pathname.indexOf('-')
    let dotIndex = pathname.indexOf('.')
    let countryAPI = ''
    if ((pathname.indexOf('.') < pathname.indexOf('-')) && pathname.indexOf('.') != -1){
      countryAPI = (dotIndex === -1 ? pathname : pathname.substr(0, dotIndex))
    }
    else {
      countryAPI = (spaceIndex === -1 ? pathname : pathname.substr(0, spaceIndex))
    }
    let countryConverter = {"United-States-of-America": "usa", "United-Kingdom": "uk", "China": "republicofchina"}
    if (countryConverter[pathname] !== undefined) {
      countryAPI = countryConverter[pathname]
    }
    if (countryAPI == "United") {
      countryAPI = pathname
    }
    fetch(`https://restcountries.com/v3.1/name/` + countryAPI + '?fields=name,capital,currencies,population,region,timezones,flags,languages,currencies')
    .then(response => response.json())
    .then(data => {
      if (!data.status) {
        data = data[0]
        let money = ""
        let length = Object.values(data["currencies"]).length
        let counter = 0
        for (let c of Object.values(data["currencies"])){
          money += c["name"] + ' [' + c["symbol"] + ']'
          counter += 1
          if (counter < length){
            money += ', '
          }
        }
        setLocationInfo({"Capital": data.capital, "Population": data.population, "Region": data.region, "Timezone": data.timezones, "Flag": data.flags, "Language": data.languages, "Currency": money})
      }
    })
    setTimeout(function() { //Start the timer
      setErrorMsg(true) //After 1 second, set render to true
    }, 1000)
  }, [currentLocation, cookies.token, user.logged_in])

  const returnLocationName = () => {
    let cLArray = currentLocation.split('-')
    for (let i = 0; i < cLArray.length; i++) {
      cLArray[i] = cLArray[i][0].toUpperCase() + cLArray[i].substr(1);
    }
    return (cLArray.join(' '))
  }

  const returnLocationInfo = () => {
    if (locationInfo) {
      return(
        <div id = "locationBox">
        {locationInfo && <img src={locationInfo["Flag"]["png"]} style = {{"marginRight": "2vw", border: "0.1vh black solid"}}/>}
        <div style = {{"display":"block", "margin-left": "2vw"}}>
          <p>Capital: {locationInfo["Capital"]}</p>
          <p>Population: {locationInfo["Population"]}</p>
          <p>Region: {locationInfo["Region"]}</p>
          <p>Timezone: {locationInfo["Timezone"].join(', ')}</p>  
          <p>Languages: {Object.values(locationInfo["Language"]).join(', ')}</p>  
          <p>Currencies: {locationInfo["Currency"]}</p>  
        </div>

      </div>
      )
    }
  }

  const errorMessage = () => {
    if (errorMsg){
      return (<h1 style = {{"textAlign": "center", fontSize: "3vh"}}>The following location may not exist, either retype the path or insert it to the database</h1>)
    }
  }

  const check_location = window.location.pathname.substr(0, 11);
  if (check_location == '/locations/' && locationInfo) {
    return(
      <div>
          <div style = {{display: "flex", justifyContent: "space-between","textAlign": "center", "marginLeft": "0vw", "marginRight": "0vw", "marginTop": "1.5rem","marginBottom": "2rem"}}>
          {user.logged_in && <div> <Link style = {{borderRadius: "0.2rem", marginTop: "auto", marginBottom: "auto", padding: "0.5rem 0.3rem 0.5rem 0.3rem", backgroundColor: "green", color:"white", textDecoration:"None"}} 
            Link to= {{pathname: '/forum/' + currentLocation}}>{currentLocation.replace(/-/g, ' ')} Forum</Link>
            </div>}
            <h1 style = {{"fontSize": "2rem"}}>Welcome to {returnLocationName()}</h1>
            {user.logged_in && <SaveLocationtoList parentCurrentLocation = {currentLocation} parentCookies = {cookies} parentUser = {user}/>}
          </div>

          <div>
              {returnLocationInfo()}
          </div>

      </div>
      )
  }
  else{
    return(
      <div style = {{textAlign: "center", marginTop: "4vh"}}>
        <Spinner animation="border" style = {{width: "5vw", height: "5vw"}} />
        {errorMessage()}
      </div>
)
  }

}

export default Specific_Location 