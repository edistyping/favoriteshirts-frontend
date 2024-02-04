
import React, {useCallback, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom' // changed useHistory to useNavigate() 
import {api} from '../../utils/api'
import {setToken} from '../../utils/localstorage'
import './SignIn.css'

function SignIn() {
  const {replace, push} = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  console.log('test')
  
  const _handleSubmit = useCallback(async () => {
    // callback
    if (email.length > 2 && password.length > 2) {
      setLoading(true)

      const {statusCode, data} = await api.postRequest('/api/user/signin', {
        email,
        password,
      })
      setLoading(false)
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false)
        alert(data)
        return
      }
      const {token} = JSON.parse(data)
      setToken(token)
      replace('/')
    }
  }, [email, password, replace])

  if (loading) return <h1>Loading.....</h1>
  return (
    <div className="signinscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              // backgroundColor: 'red',
            }}
          >
            <div style={{cursor: 'pointer'}} onClick={() => push('/')}>
              <i class="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Sign In</p>
          </div>

          <label for="email">Email</label>
          <input
            type="email"
            id="lname"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="lname"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Link to="/signup" className="link">
            <span>Creat a new account ?</span>
          </Link>
          <br />

          <input type="submit" value="Sign in" onClick={_handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default SignIn
