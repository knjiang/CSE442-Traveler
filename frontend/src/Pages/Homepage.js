import {useState,useEffect} from "react"
import './Homepage.css'
import { DropdownButton, Dropdown, Button } from 'react-bootstrap'
import Login from '../components/Login';
import { useCookies } from 'react-cookie';

function Homepage(){
  const [cookies,setCookie, removeCookie] = useCookies(['token']);
  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
  })

  useEffect(() => {
    if (cookies.token && !user.logged_in){
      fetch("http://localhost:8000/dj-rest-auth/user",
                {
                    headers: {
                        'Authorization' : 'Token ' + cookies.token
                    },
                    method: "GET",
                })
      .then(response => response.json())
      .then(data => {
        setUser({
          logged_in: true,
          name: data.first_name,
          email: data.email
        })
      })
    }
  })

  const logoutUser = () => {
    fetch("http://localhost:8000/dj-rest-auth/logout/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Token ' + cookies.token
        },
        method: "POST",
    })
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

  return(
    <div>
      <h1>Welcome to the Traveler Homepage</h1>
      {!user.logged_in && <Login/>}
      <br/>
      {user.logged_in && <Button variant="outline-dark" onClick = {logoutUser}>
      Logout
      </Button>}
      {user.logged_in && <h1>Hello {user.name}!</h1>}
    </div>
  )
}

export default Homepage;