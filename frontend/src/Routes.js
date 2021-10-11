import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage'
import Browse_Locations from './Pages/Browse_Locations'
import Specific_Location from './Pages/Specific_Location'
import Search_Users from './Pages/Search_Users'
import Forum from './Pages/Forum'
import UserProfile from './Pages/UserProfile';
import ForumPost from './Pages/ForumPost.js'
import ForumContent from './Pages/ForumContent'

const Routes = () => {
    return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={Homepage}></Route>
        <Route exact path='/locations' component={Browse_Locations}></Route>
        <Route path='/locations/:id' component={Specific_Location}></Route>
        <Route exact path='/search' component={Search_Users}></Route>
        <Route path='/forum' component={Forum}></Route>
        <Route exact path='/my-profile' component={UserProfile}></Route>
        <Route path = '/post' component={ForumPost}></Route>
        <Route path ='/ForumContent' component={ForumContent}></Route>
      </Switch>
    );
  }

export default Routes