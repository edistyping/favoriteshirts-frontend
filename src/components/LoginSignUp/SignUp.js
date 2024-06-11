
import React, {useCallback, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {api} from '../../utils/api'

import './LoginSignUp.css'

function SignUp( props ) {
  const {replace, push} = useNavigate()
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const _handleSubmit = useCallback(async () => {
    if (username.length > 1 && email.length > 2 && password.length > 1) {
      setLoading(true)
      // const {statusCode, data} = await api.postRequest('/api/user/signup', {
      //   email,
      //   username,
      //   password,
      // })
      const {statusCode, data} = await api.postRequest('/api/user', {
          email,
          username,
          password,
      })  
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false)
        return
      }
      alert("Sign Up successful!")
      props.setSignUp(false)
    }
  }, [email, username, password, replace])

  if (loading) return <h1>Loading...</h1>
  return (
    <div className="signupscreen">

          <input
            type="text"
            id="username"
            name="username"
            placeholder="USERNAME"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="EMAIL"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="lname"
            name="password"
            placeholder="PASSWORD"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <input type="submit" value="SIGN UP" onClick={_handleSubmit} />
        <button className="button-already" onClick={() => props.setSignUp(false)}>MEMBER?</button>
    </div>
  )
}

export default SignUp
