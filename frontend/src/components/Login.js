import React from 'react';
import GoogleLogin from 'react-google-login';
import { useCookies } from 'react-cookie';
import { loginBackend} from '../apis/auth';

function Login(){
    const [cookies,setCookie] = useCookies(['token']);

    const onSuccess = (res) => {
        loginBackend(res.accessToken)
        .then(response => response.json())
        .then(data => {
            setCookie('token', data.key, { path: '/' });
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    const onFailure = (res) => {
        alert("failed to login")
    }

    return (
    <div style = {{maxHeight: "5.5vh"}}>
        <GoogleLogin
            clientId="85523674578-777iult9teb9k3avv9cu2h0fkpn86bnp.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style = {{"maxWidth": "2vw", "color": "blue", transform: "scale(1, 1)"}}
            theme = "dark"
        />
    </div>
    );
}

export default Login;