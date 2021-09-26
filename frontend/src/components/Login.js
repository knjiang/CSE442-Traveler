import React from 'react';
import GoogleLogin from 'react-google-login';
import { useCookies } from 'react-cookie';

function Login(){
    const [cookies,setCookie] = useCookies(['token']);

    const onSuccess = (res) => {
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