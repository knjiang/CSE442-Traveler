import { useCookies } from 'react-cookie';
import { changeBackground, getProfile, changeVisited } from '../apis/profiles';
import { useState, useEffect } from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';
import { getShareableContents } from "../apis/locations"
import { StyleHTMLAttributes } from 'react';

function UserProfile(props) {

  const [cookies, setCookie] = useCookies(['token']);

  const [dataList, setList] = useState({
    lists: []
  })
  // const [countryList, setCountryList] = useState("")
  const [visitedCounttries, setVisitedCountries] = useState("")

  const { value: backgroundInfo, bind: backgroundInfoBind, reset: resetBackgroundInfo } = useTextInput('')
  const { value: visitedInfo, bind: visitedInfoBind, reset: resetVisitedInfo } = useTextInput('')


  const user = props.parentUser
  const setUser = props.parentSetUser 

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
    // window.location.reload()
  }

  useEffect(() => {
    const pathname = window.location.pathname.substr(7)
    console.log(pathname)
    getShareableContents(pathname)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // setDataList(data.locations)
        setVisitedCountries(data.visitedCounttries)
      })
  }, [])

  const returnVisitedLocations = () => {
    let res = [<div style={{ "borderBottom": "2px solid gray", "display": "flex" }}><h2 style={{ "fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto" }}>Favorite Locations</h2></div>]
    for (let name of Object.values(dataList)) {
      res.push(<p>{name}</p>)
    }
    return (res)
  }


  if (existsCookie) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: (214, 122, 127) }}>Welcome {user.name} </h1>

        <h2 style={{ textAlign: 'center' }}> About Me</h2>
        <ul style={{ textAlign: 'center', listStyle: 'none' }}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email} </li>
          <li>Location: {user.from_location}</li>
        </ul>

        <p style={{textAlign: 'center' }}>For the following text fields, please enter the information you want to display and press Sumbit <br />
        "Refresh Browser to see changes applied"</p>

      
        {/* This is for background */}
        <h2 style={{ textAlign: 'center' }}>Background and Interests</h2>
        <p style={{ textAlign: 'center' }}>{user.background}</p>
        <form onSubmit={(e) => handleSubmit(e)} style={{ textAlign: 'center' }}>
          <label>
            <h5>Change Background</h5>
            <br />
            <p>Background/Interests: <input type="text" {...backgroundInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p style={{ textAlign: 'center' }}>{backgroundInfo}</p>

        {/* This is for Recommendations for favorite countries */}
        <h3 style={{ textAlign: 'center' }}>Recommendations based on Favorites</h3>
        <p style={{ textAlign: 'center' }}>{user.visited}</p>

        <form onSubmit={(b) => handleSubmit2(b)} style={{ textAlign: 'center' }}>
          <label>
            {/*<h5 style={{ textAlign: 'center' }}>My Recommendations for Favorite Locations</h5>*/}
            <p>Recommendations: <input type="text" {...visitedInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p style={{ textAlign: 'center' }}>{visitedInfo}</p>

        {/* Display the visited countries*/}
        {returnVisitedLocations()}

      </div>
    )
  }
  return <NotLoggedIn />
}
export default UserProfile;