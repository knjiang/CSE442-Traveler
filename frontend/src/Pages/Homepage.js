import {useState,useEffect} from "react"
import './Homepage.css'
import { DropdownButton, Dropdown, Button } from 'react-bootstrap'
import Login from '../components/Login';
import { useCookies } from 'react-cookie';
import { logoutBackend} from '../apis/auth';
import { getProfile } from '../apis/profiles';
import LocationForm from "../components/LocationForm";
import { getLocation } from "../apis/locations";
import { changeList, getList } from '../apis/profiles';
import { useTextInput} from '../hooks/text-input';

function Homepage(){
  const [cookies,setCookie, removeCookie] = useCookies(['token']);

  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
    from_location: "",
  })

  const {value:listName,bind:listNameBind,reset:resetListName } = useTextInput('')
  const {value:locationList,bind:locationListBind,reset:resetLocationList } = useTextInput('')

  const [list,setList] = useState({
    name: "",
    lists: []
  })

  const [location, setLocation] = useState({
    location: []
  })

  useEffect(() => {
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
    getLocation()
    .then(response => response.json())
    .then(data => {
      if (data){
        setLocation({location: (data.map(({id, name}) => [name]))})
      }
    })
    getList(cookies.token)
    .then(response => response.json())
    .then(data =>{
      if (!data){
        setList({lists: (data.map(({id, name}) => [name]))})
      }
    })
  }, [])

  const location_set = () => {
    return user.from_location != ""
  }

  const logoutUser = () => {
    logoutBackend(cookies.token)
    .then(response => response.json())
    .then(data =>{
      removeCookie('token',{ path: '/' })
      setUser({
        logged_in : false,
        name: "None",
        email: "None",
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleListChange = (e) => {
    e.preventDefault()
    setList({name: e.target.value, })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //JSON.parse(list.name) is payload
    changeList(cookies.token,listName,locationList)
    resetListName()
    resetLocationList()
  }

  const locations_dropDown = () => {
    if (location){
      return(
        <DropdownButton id="dropdown-basic-button" title="Choose your location">
            {location.location.map((locations, index) => (
                <div className = "Location_Boxes">
                  <Dropdown.Item href = {'/locations/' + locations}>{locations}</Dropdown.Item>
                </div>
            ))}
          </DropdownButton>
      )
    }
    else {
      return (
        <DropdownButton id="dropdown-basic-button" title="Choose your location">
        </DropdownButton>
      )
    }
  }

  return(
    <div>
      <h1>Welcome to the Traveler Homepage</h1>
      {!user.logged_in && <Login/>}
      <br/>
      {user.logged_in && <Button variant="outline-dark" onClick = {logoutUser}>
      Logout
      </Button>}
      {user.logged_in && <h1>Hello {user.name}!</h1>}
      <br/>
      <br/>
      {user.logged_in && !location_set() && <LocationForm/>}
      {user.logged_in && location_set() && <p>You are from {user.from_location}</p>}
      {locations_dropDown()}
      <form onSubmit = {(e) => handleSubmit(e)}>
        <label>
          Create new list:
          <input type="text" {...listNameBind} /> <br/>
          <input type="text" {...locationListBind}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <p>Your saved Lists are: {list.lists}</p>
    </div>
  )
}

export default Homepage;