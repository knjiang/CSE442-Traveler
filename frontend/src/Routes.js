import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage'
import Browse_Locations from './Pages/Browse_Locations'
import Specific_Location from './Pages/Specific_Location'
import Forum from './Pages/Forum'


const Routes = () => {
    return (
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={Homepage}></Route>
        <Route exact path='/locations' component={Browse_Locations}></Route>
        <Route path='/locations/:id' component={Specific_Location}></Route>
          <Route path='/forum' component={Forum}></Route>
      </Switch>
    );
  }

export default Routes