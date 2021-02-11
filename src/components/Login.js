import React, {useState} from 'react'
import loginService from '../services/login'

const Login = ({ setUser }) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const loggedInUser = await loginService.login({username: userName, password}) 
      window.localStorage.setItem('user', JSON.stringify(loggedInUser))
      console.log(loggedInUser)
      setUserName('')
      setPassword('')
      setUser(loggedInUser)
    } catch (exception) {
      alert(exception)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          name="Username"
          value={userName}
          type="text"
          onChange={({target}) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          name="Password"
          value={password}
          type="password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login