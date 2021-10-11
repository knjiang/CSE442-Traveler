import { useEffect, useState } from "react"
import { getLocation } from "../apis/locations";
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';
import NavBar from '../components/NavBar'
import SaveLocationtoList from "../components/SaveLocationToList";
import './Specific_Location.css'

/*This is the page that shows the location the user clicked*/

function Specific_Location (props) {

  const [currentLocation,setLocation] = useState(false)

  const [realLocation,setReal] = useState(false)

  const [cookies, setCookie, removeCookie] = useCookies(['token']);


  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
    from_location: "",
    search_query: '',
  })

  useEffect (() => {
    if (!currentLocation){
      const pathname = window.location.pathname.substr(11)
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
          if (realLocations.some(x => x.toLowerCase() == currentLocation.toLowerCase())){
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
  }, [currentLocation, cookies.token, user.logged_in])

  const check_location = window.location.pathname.substr(0, 11);
  if (check_location == '/locations/' && currentLocation && realLocation) {
    return(
      <div>
          <div style = {{"display": "block", "textAlign": "center", "marginLeft": "10vw", "marginRight": "10vw", "marginTop": "3vh","marginBottom": "5vh"}}>
            <h1>Welcome to {currentLocation.charAt(0).toUpperCase() + currentLocation.slice(1).toLowerCase()}</h1>
            {user.logged_in && <SaveLocationtoList parentCurrentLocation = {currentLocation} parentCookies = {cookies} parentUser = {user}/>}
          </div>
          
          <div id = "locationBox">
            <img src="https://picsum.photos/800/500" alt="Girl in a jacket"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus eros id vestibulum maximus. Nullam lectus ex, faucibus commodo metus a, auctor mattis felis. Nulla neque nulla, tincidunt a gravida a, placerat eu dolor. Aliquam ac metus bibendum, vehicula neque et, ullamcorper dui. Vestibulum tempor porttitor molestie. Ut eu elementum dolor, sed ornare nulla. Nullam dui magna, posuere id nisi consectetur, gravida mattis turpis. In a laoreet libero, at faucibus ligula. Donec nec ipsum urna. Ut lobortis ut odio nec lobortis. Aliquam vitae enim eu augue ultricies porttitor eu a justo. Nullam finibus dictum dolor, quis consectetur ante tempor id. Praesent in vestibulum neque. </p>
                      
          </div>
      </div>
      )
  }
  else{
    return(<h1 style = {{"textAlign": "center"}}>The following page does not exist</h1>)
  }

}

export default Specific_Location 