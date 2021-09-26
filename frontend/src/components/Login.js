import React from 'react';
import GoogleLogin from 'react-google-login';
import { useCookies } from 'react-cookie';
<<<<<<< HEAD
import { loginBackend} from '../apis/auth';
=======
>>>>>>> 3e1f2d283607283cee1a972783b8d0f9bc999b5a

function Login(){
    const [cookies,setCookie] = useCookies(['token']);

    const onSuccess = (res) => {
<<<<<<< HEAD
        loginBackend(res.accessToken)
=======
        fetch("http://localhost:8000/dj-rest-auth/google/",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
              "access_token": res.accessToken,
              "code": "",
              "id_token": "",
          })
        })
>>>>>>> 3e1f2d283607283cee1a972783b8d0f9bc999b5a
        .then(response => response.json())
        .then(data => {
            setCookie('token', data.key, { path: '/' });
             console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    const onFailure = (res) => {
        console.log(res);
    }

    return (
    <div>
        <GoogleLogin
            clientId="85523674578-777iult9teb9k3avv9cu2h0fkpn86bnp.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    </div>
    );
}

export default Login;