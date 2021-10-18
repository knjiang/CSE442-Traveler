import {useState,useEffect} from "react"
import { getUserList, getUserInfo } from '../apis/profiles';
import { Link , BrowserRouter as Router } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getProfile, getProfileLists } from '../apis/profiles';

function Search_Users(){

  const [filter, setFilter] = useState('')
  const [usernames, setUsernames] = useState([])
  
    const [user,setUser] = useState({
        search_query: '',
        username: '',
        email: '',
        from_location: '',
        background: '',
    })

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
  
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
      getUserList()
      .then(response => response.json())
      .then(data => {
          setUsernames(data.users)
      })

    }, [])

    const findUser = (e) => {
      e.preventDefault()
        setUser({
          search_query: e.target.value,
        })
    }
    
    return(
      <div>
        <div>
          <form onSubmit={
              (e) => 
              {e.preventDefault();
              getUserInfo(user.search_query)
              .then(response => response.json())
              .then(data => {
                  setUser({
                    username: data.first_name,
                    email: data.email,
                    from_location: data.from_location
                  }); setFilter('');
              })
            }}>
            <input
              value={filter}
              method="get"
              type='text'
              placeholder="Search Travel Buddies"
              onChange={e => { findUser(e); setFilter(e.target.value) }}
            />
            <button type='submit'>Find</button>
          </form>
          <ul>
            {usernames.filter(u => u.includes(filter) || filter === '')
              .map((u) => 
                <li>
                  <Link to={{
                    pathname: '/search/' + u.split("@")[0],
                    state: {
                    searched_email: u,
                    },
                    }}
                  >
                    {u}
                  </Link>




                  {/* <Link to={"/search/" + (index + 1)}> {u} </Link> */}
                </li>
              
              )}
          </ul>
          <br/>
          <br/>
          <h1> Search result with: {user.email} </h1>
          <br/>
          <h1>Found: {user.username} - {user.from_location}</h1>
        </div>
        </div>
    )
}

export default Search_Users;