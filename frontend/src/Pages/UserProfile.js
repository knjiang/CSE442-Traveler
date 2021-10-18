import { useCookies } from 'react-cookie';
import { changeBackground, getProfile } from '../apis/profiles';
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

  const [user, setUser] = useState({
    logged_in: false,
    name: "None",
    email: "None",
    from_location: "",
    background: ""
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
              background: data.background
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
  }

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

        <h2 style={{textAlign:'center'}}>Background and Interests</h2>
        <p style={{textAlign:'center'}}>{user.background}</p>
        <br /> <br />
        <form onSubmit={(e) => handleSubmit(e)} style={{textAlign:'center'}}>
          <label>
            <h5 style={{textAlign:'center'}}>Change/Add your background and interests in the text box below</h5>
            <h5 style={{textAlign:'center'}}>Submit and refresh browser to see applied changes</h5>
            <br />
            <p>Background/Interests: <input type="text" {...backgroundInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p style={{textAlign:'center'}}>{backgroundInfo}</p>
      </div>
    )
  }
  return <NotLoggedIn />
}
export default UserProfile;