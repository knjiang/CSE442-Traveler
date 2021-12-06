import './App.css';
import Routes from './Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';
import { getProfile } from './apis/profiles';
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
    from_location: "",
    background: "",
    visited: "",
    displayName: "",
    profileLocation: "",
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
            from_location: data.from_location,
            background: data.background,
            visited: data.visited,
            displayName: data.displayName,
            profileLocation: data.profileLocation,
          })
        }
      })
    }
  })

  return (
    <div className="App">
      <NavBar parentUser = {user} parentSetUser = {setUser}/>
      <Routes parentUser = {user} parentSetUser = {setUser}/>
    </div>
  );
}

export default App;
