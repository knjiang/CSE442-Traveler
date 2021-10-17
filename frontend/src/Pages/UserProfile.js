import { useCookies } from 'react-cookie';
import { changeBackground, getProfile, getProfileLists } from '../apis/profiles';
import { useState, useEffect } from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';

function MyList() {
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
      getProfileLists(cookies.token)
        .then(response => response.json())
        .then(data => {
          setList({
            lists: data.lists
          })
        });
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

  const empty_list = () => {
    return dataList.lists.length != 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    changeBackground(cookies.token, backgroundInfo)
    e.background = backgroundInfo // does not work
    user.background = backgroundInfo // does not work
  }

  if (existsCookie) {
    return (
      <div>
        <h1>Welcome {user.name} </h1>   <br />

        <h2> About Me</h2>
        Name: {user.name} <br />
        Email: {user.email} <br />
        Location: {user.from_location} <br />
        Background: {user.background}
        <br /> <br />

        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Enter your background Info
            <br />
            <p>Background/Interests: <input type="text" {...backgroundInfoBind} /></p>
            <br />
          </label>
          <input type="submit" value="Submit" />
        </form>
        Background: {backgroundInfo}
      </div>
    )
  }
  return <NotLoggedIn />
}
export default MyList;