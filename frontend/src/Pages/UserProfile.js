import { Component } from "react"
import './UserProfile.css'
import { useState, useEffect } from "react"
import { getQuery, getUserList } from '../apis/profiles';

function UserProfile() {
  const [filter, setFilter] = useState('')
  const [usernames, setUsernames] = useState([])

  // CREATE USER VARIABLE AND SET STATES
  const [user, setUser] = useState({
    search_query: '',
    username: '',
    email: '',
    from_location: '',
  })

  // UTILIZE APIS
  useEffect(() => {
    getUserList()
      .then(response => response.json())
      .then(data => {
        setUsernames(data.users)
      })

  }, [])

  // FIND TARGET USER
  const findUser = (e) => {
    setUser({
      search_query: e.target.value,
    })
  }

    // PROFILE PAGE WILL HAVE NAME, BACKGROUND/INTERESTS, AND ABOUT ME SECTIONS
  return (

    <div>
      {/* GREET USER WHEN VIEWING PROFILE PAGE  */}
      <h2>Hello,  <br /> {usernames.filter(u => u.includes(filter) || filter === '')}</h2>

      {/* CREATE A BACKGROUND AND INTERESTS SECTION */}
      <h4>My background and interests</h4>



      {/* SHOW ABOUT ME IN PROFILE PAGE */}
      <h4>About Me</h4>
      <h5>Name: {user.first_} </h5>   {/* TODO: MAKE SURE NAME APPEARS HERE */}
      <h5>From: {user.from_location}</h5> {/* TODO: MAKE SURE LOCATION APPEARS HERE*/}
      <h5>Email: {user.email}</h5>  {/* TODO: MAKE SURE EMAIL IS DISPLAYED HERE */}


    </div>
  )
}

export default UserProfile