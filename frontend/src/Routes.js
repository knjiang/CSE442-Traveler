import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage'
import Browse_Locations from './Pages/Browse_Locations'
import Specific_Location from './Pages/Specific_Location'
import Search_Users from './Pages/Search_Users'
import Searched_Profile from './Pages/Searched_Profile'
import Forum from './Pages/Forum'
import UserProfile from './Pages/UserProfile';
import Post from './Pages/Post.js'
import ForumContent from './Pages/ForumContent'
import MyList from './Pages/MyList'

const Routes = (props) => {
    const user = props.parentUser
    const setUser = props.parentSetUser

    return (
      <div>

        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' render = {() => (<Homepage parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/locations' render = {() => (<Browse_Locations parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path='/locations/:id' render = {() => (<Specific_Location parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/search' render = {() => (<Search_Users parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path='/search/:id' render = {() => (<Searched_Profile parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path='/forum' render = {() => (<Forum parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/my-profile' render = {() => (<UserProfile parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path = '/post' render = {() => (<Post parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path ='/ForumContent' render = {() => (<ForumContent parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path ='/my-lists' render = {() => (<MyList parentUser = {user} parentSetUser = {setUser} />)}></Route>
        </Switch>
      </div>

    );
  }

export default Routes