import { useCookies } from 'react-cookie';
import { getProfile, getProfileLists } from '../apis/profiles';
import {useState,useEffect} from "react"
import NotLoggedIn from '../components/NotLoggedIn';
// import { Component } from "react"
import './UserProfile.css'
// import { getQuery, getUserList } from '../apis/profiles';
function UserProfile() {

  //  NAV BAR FUNCTIONALITY














  const [cookies, setCookie] = useCookies(['token']);
  const [user, setUser] = useState({
    logged_in: false,
    name: "None",
    email: "None",
    from_location: "",
    background: "",
  })

  const existsCookie = typeof cookies.token != "undefined"

  useEffect(() => {
    if (existsCookie) {
      getProfileLists(cookies.token)
        .then(response => response.json())
        .then(data => {
        });
      getProfile(cookies.token)
        .then(response => response.json())
        .then(data => {
          if (!data.detail) {
            setUser({
              logged_in: true,
              name: data.first_name,
              email: data.email,
              from_location: data.from_location
            });
          }
        });
    }
  }, [])

  if (existsCookie) {
    return (

      <div>
        {/* GREET USER WHEN VIEWING PROFILE PAGE  */}
        <h2>Hello,</h2>

        {/* CREATE A BACKGROUND AND INTERESTS SECTION */}
        <h4>My background and interests</h4>
        {/* SHOW ABOUT ME IN PROFILE PAGE */}
        <h4>About Me</h4>
        <h5>Name: {user.name} </h5>   {/* TODO: MAKE SURE NAME APPEARS HERE */}
        <h5>From: {user.from_location}</h5> {/* TODO: MAKE SURE LOCATION APPEARS HERE*/}
        <h5>Email: {user.email}</h5>  {/* TODO: MAKE SURE EMAIL IS DISPLAYED HERE */}
      </div>
    )
  }
  return <NotLoggedIn />
}

export default UserProfile