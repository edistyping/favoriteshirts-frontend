
import React, {useCallback, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom' // changed useHistory to useNavigate() 
import { api } from '../../utils/api'
import {setFavorites, setToken} from '../../utils/localstorage'


import SignUp from './SignUp'
import './LoginSignUp.css'

import { useDispatch } from 'react-redux'
import { setUserDetails } from '../../redux/actions/userAction'

function LoginSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [signUp, setSignUp] = useState(false) 

  const _handleSignIn = useCallback(async () => {
    if (username.length > 2 && password.length > 2) {
      setLoading(true)

      console.log('handlesignin')
      const {statusCode, data} = await api.postRequest('/api/user/signin', {
        Email: "",
        Username: username,
        Password: password,
      })

      console.log(statusCode)
      console.log(data)
      console.log('aaaaaaaaaaaaaaaa')


      setLoading(false)
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false)
        return
      }
      
      const token = data
      alert('Token received is ' + token)
      setToken(token)
      dispatch(setUserDetails())
    }
  }, [username, password, navigate])

  if (loading) return <h1>Loading.....</h1>
  return (
    <div className="signinscreen">
          { signUp ? 
            <SignUp setSignUp={setSignUp}/>
            :
            <>
              <input
              type="username"
              id="username"
              name="username"
              placeholder="Your username.."
              value={username}
              onChange={e => setUsername(e.target.value)}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your Password.."
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input type="submit" value="SIGN IN" onClick={_handleSignIn} />
              <button onClick={() => setSignUp(!signUp)}>SIGN UP</button>
            </>
          }
    </div>
  )
}

export default LoginSignUp
