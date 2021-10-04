import {useState,useEffect} from "react"
import { getProfile } from '../apis/profiles';
import { getQuery, getUserList } from '../apis/profiles';

function Search_Users(){

    const [filter, setFilter] = useState('')
    const [usernames, setUsernames] = useState([])
    const [user,setUser] = useState({
        search_query: '',
        username: '',
        email: '',
        from_location: '',
    })

    useEffect(() => {
      getUserList()
      .then(response => response.json())
      .then(data => {
          setUsernames(data.users)
      })
      
    }, [])

    const findUser = (e) => {
        setUser({
          search_query: e.target.value,
        })
    }

    console.log(usernames)
    return(
        <div>
          {/* <h1>Change detected: {user.search_query}</h1> */}

          <form onSubmit={
              (e) => getQuery(e,user.search_query)
              .then(response => response.json())
              .then(data => {
                  setUser({
                    username: data.first_name,
                    email: data.email,
                    from_location: data.from_location
                  })
              })
            }>
            <input
              value={filter}
              method="get"
              type='text'
              placeholder="Search Travel Buddies"
              onChange={e => { findUser(e); setFilter(e.target.value) }}
              name='s'
              id='user-search'
            />
            <button type='submit'>Find</button>
          </form>

          <ul>
            {usernames.filter(u => u.includes(filter) || filter === '')
              .map(u => <li> {u} </li>)}
          </ul>
          <br/>
          <br/>
          <h1> Search result with: {user.email} </h1>
          <br/>
          <h1>Found: {user.username} - {user.from_location}</h1>
        </div>
    )
}

export default Search_Users;