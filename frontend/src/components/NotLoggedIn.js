import React from 'react';
import { Link } from 'react-router-dom';

function NotLoggedIn(){
    return(
    <div>
      <h3>Hi! You aren't logged in, please login to your account to access your information! </h3>
      <Link to="/">
        Go Home
      </Link>
    </div>
  )
};

export default NotLoggedIn