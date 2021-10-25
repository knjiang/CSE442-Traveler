import { useCookies } from 'react-cookie';
import { changeBackground, getProfile, changeVisited  } from '../apis/profiles';
import { useState, useEffect } from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';
import { StyleHTMLAttributes } from 'react';

function UserProfile() {

  const [cookies, setCookie] = useCookies(['token']);

  const [dataList, setList] = useState({
    lists: []
  })

  const { value: backgroundInfo, bind: backgroundInfoBind, reset: resetBackgroundInfo } = useTextInput('')
  const { value: visitedInfo, bind: visitedInfoBind, reset: resetVisitedInfo } = useTextInput('')


  const [user, setUser] = useState({
    logged_in: false,
    name: "None",
    email: "None",
    from_location: "",
    background: "",
    visited: ""
  })

  const existsCookie = typeof cookies.token != "undefined"

  useEffect(() => {
    if (existsCookie) {
      getProfile(cookies.token)
        .then(response => response.json())
        .then(data => {
          if (!data.detail) {
            setUser({
              logged_in: true,
              name: data.first_name,
              email: data.email,
              from_location: data.from_location,
              background: data.background,
              visited: data.visited
            });
          }
        });
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    changeBackground(cookies.token, backgroundInfo)
    e.background = backgroundInfo // does not work
    user.background = backgroundInfo // does not work
    // window.location.reload()
  }

  const handleSubmit2 = (b) => {
    b.preventDefault()
    changeVisited(cookies.token, visitedInfo)
    {countryList.map((visitedInfo) => (
      <li key={visitedInfo}>{visitedInfo}</li>
    ))}
    // window.location.reload()
  }

  const [countryList, setCountryList] = useState([
    {
      id: 1,
      country: user.from_location
    },
    {
      id:2,
      country: 'france'
    },
    {
      id:3,
      country: 'Spain'
    }
  ])


  if (existsCookie) {
    return (
      <div>
        <h1 style={{textAlign:'center', color:(214, 122, 127)}}>Welcome {user.name} </h1>

        <h2 style={{textAlign:'center'}}> About Me</h2>
        <ul style={{textAlign:'center',listStyle: 'none'}}>
        <li>Name: {user.name}</li>
        <li>Email: {user.email} </li>
        <li>Location: {user.from_location}</li>
        </ul>


        {/* This is for background */}
        <h2 style={{textAlign:'center'}}>Background and Interests</h2>
        <p style={{textAlign:'center'}}>{user.background}</p>
        <form onSubmit={(e) => handleSubmit(e)} style={{textAlign:'center'}}>
          <label>
            <h5>Change Background</h5>
              <br />
            <p>Background/Interests: <input type="text" {...backgroundInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p style={{textAlign:'center'}}>{backgroundInfo}</p>

        <h2 style={{textAlign:'center'}}>Countries Visited</h2>
        <p style={{textAlign:'center'}}>{user.visited}</p>

        <form onSubmit={(b) => handleSubmit2(b)} style={{textAlign:'center'}}>
          <label>
            <h5 style={{textAlign:'center'}}>Write countries visited in format:(US, France, etc) </h5>
            <p>Countries: <input type="text" {...visitedInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p style={{textAlign:'center'}}>{visitedInfo}</p>

      </div>
    )
  }
  return <NotLoggedIn />
}
export default UserProfile;