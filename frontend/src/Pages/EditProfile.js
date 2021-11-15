import { useCookies } from 'react-cookie';
import { changeBackground, changeEmail, changeUserName, changeVisited } from '../apis/profiles';
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';
import { Button } from 'react-bootstrap'

function EditProfile(props) {

    const user = props.parentUser
    const setUser = props.parentSetUser
    const [cookies, setCookie] = useCookies(['token']);
    const existsCookie = typeof cookies.token != "undefined"

    const { value: nameInfo, bind: nameBind, reset: resetNameBind } = useTextInput('')
    const { value: emailInfo, bind: emailBind, reset: resetEmailBind } = useTextInput('')
    const { value: backgroundInfo, bind: backgroundInfoBind, reset: resetBackgroundInfo } = useTextInput('')
    const { value: visitedInfo, bind: visitedInfoBind, reset: resetVisitedInfo } = useTextInput('')

    const handleSubmit = (e) => {
        e.preventDefault()
        changeBackground(cookies.token, backgroundInfo)
        setUser(prevState => ({ ...prevState, background: backgroundInfo }))
    }

    const handleSubmit2 = (b) => {
        b.preventDefault()
        changeVisited(cookies.token, visitedInfo)
        setUser(prevState => ({ ...prevState, visited: visitedInfo }))
    }

    const handleName = (e) => {
        e.preventDefault()
        changeUserName(cookies.token, nameInfo)
        setUser(prevState => ({ ...prevState, first_name: nameInfo}))

    }

    const handleEmail = (e) => {
        e.preventDefault()
        changeEmail(cookies.token, emailInfo)
        setUser(prevState => ({ ...prevState, email: emailInfo}))
        user.email = emailInfo
    }


    const returnEditMode = () => {
        return (
            <div>
                <h1 style={{ textAlign: 'center', color: (214, 122, 127) }}>Edit Your Profile</h1>
                <br />

                <a href='/my-profile'><Button id="navButtonOn" variant="outline-dark"><h1 id="buttonText">Done Editing</h1></Button></a>

                <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}> About Me</h5>
                <div style={{ textAlign: 'center' }}>
                    <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email} </li>
                        <li>Location: {user.from_location}</li>
                    </ul>
                </div>


                <form onSubmit={(e) => handleName(e)} style={{ textAlign: 'center' }}>
                    <label>
                        <br />
                        <p>Change Name: <input type="text" {...nameBind} /></p>
                    </label>
                    <input type="submit" value="Submit" />
                </form>


                <form onSubmit={(e) => handleEmail(e)} style={{ textAlign: 'center' }}>
                    <label>
                        <br />
                        <p>Change Email: <input type="text" {...emailBind} /></p>
                    </label>
                    <input type="submit" value="Submit" />
                </form>


                <form onSubmit={(e) => handleSubmit(e)} style={{ textAlign: 'center' }}>
                    <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Background and Interests</h5>
                    <p style={{ textAlign: 'center' }}>{user.background}</p>
                </form>

                <form onSubmit={(e) => handleSubmit(e)} style={{ textAlign: 'center' }}>
                    <label>
                        <p>Change Background: <input type="text" {...backgroundInfoBind} /></p>
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <p style={{ textAlign: 'center' }}>{backgroundInfo}</p>
                <h5 style={{ textAlign: 'center'}}>Recommendations based on Favorites</h5>
                <p style={{ textAlign: 'center' }}>{user.visited}</p>

                <form onSubmit={(b) => handleSubmit2(b)} style={{ textAlign: 'center' }}>
                    <label>
                        {/*<h5 style={{ textAlign: 'center' }}>My Recommendations for Favorite Locations</h5>*/}
                        <p>Recommendations: <input type="text" {...visitedInfoBind} /></p>
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <p style={{ textAlign: 'center' }}>{visitedInfo}</p>
            </div>
        )
    }

    if (existsCookie) {
        return (
            <div>
                {returnEditMode()}
            </div>
        )
    } return <NotLoggedIn />
}
export default EditProfile;