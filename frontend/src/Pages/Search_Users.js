import { useState } from "react"
import { getProfile } from '../apis/profiles';
import { getQuery } from '../apis/profiles';

function Search_Users(){

    const [user,setUser] = useState({
        search_query: '',
        username: '',
        email: '',
        from_location: '',
    })
    
    const findUser = (e) => {
        setUser({
          search_query: e.target.value,
        })
    }
    
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
              method="get"
              type='text'
              placeholder="Search Travel Buddies"
              onChange={(e) => findUser(e)}
            />
            <button type='submit'>Find</button>
          </form>
          <br/>
          <br/>
          <h1> Search result with: {user.email} </h1>
          <br/>
          <h1>Found: {user.username} - {user.from_location}</h1>
        </div>
    )
}

export default Search_Users;