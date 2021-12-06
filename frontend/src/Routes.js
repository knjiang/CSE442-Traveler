import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage'
import Specific_Location from './Pages/Specific_Location'
import Search_Users from './Pages/Search_Users'
import Searched_Profile from './Pages/Searched_Profile'
import Forum from './Pages/Forum'
import UserProfile from './Pages/UserProfile';
import ForumPost from './components/ForumPost.js'
import MyList from './Pages/MyList'
import AdminAddLocation from './Pages/AdminAddLocation'
import SpecificForum from './Pages/SpecificForum'
import MyForum from './Pages/MyForum'
import SharedListPage from './Pages/SharedListPage'
import Messages from './Pages/Messages';
import MyFriends from './Pages/MyFriends';
import EditProfile from './Pages/EditProfile';
import MyTags from './Pages/MyTags';

const Routes = (props) => {
    const user = props.parentUser
    const setUser = props.parentSetUser

    return (
      <div>

        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path ='/admin-page/' render = {() => (<AdminAddLocation />)}></Route>
          <Route exact path='/' render = {() => (<Homepage parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path='/locations/:id' render = {() => (<Specific_Location parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/user' render = {() => (<Search_Users parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path='/user/:id' render = {() => (<Searched_Profile parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/my-profile' render = {() => (<UserProfile parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path = '/post' render = {() => (<ForumPost parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/forum' render = {() => (<Forum parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path ='/forum/:id' render = {() => (<SpecificForum parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path ='/my-lists' render = {() => (<MyList parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path ='/my-forum' render = {() => (<MyForum parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route path = '/share/:id' render = {() => (<SharedListPage parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path = '/messages' render = {() => (<Messages parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/friends' render = {() => (<MyFriends parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/edit-profile' render = {() => (<EditProfile parentUser = {user} parentSetUser = {setUser} />)}></Route>
          <Route exact path='/my-tags' render = {() => (<MyTags parentUser = {user} parentSetUser = {setUser} />)}></Route>
        </Switch>
      </div>

    );
  }

export default Routes