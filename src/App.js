import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogCreationFrom from './components/BlogCreationForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  //blogs arent shown when not logged in but still loaded?
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('user')
    if (savedUser) {
      const loggedInUser = JSON.parse(savedUser)
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
    }
  }, []) 

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const login = () => (
    <Login
      setMessage={setMessage}
      setUser={setUser}
    />
  )
  
  const blog = () => (
    <>
      <button onClick={logout}>Logout</button>
      <BlogCreationFrom
        blogs={blogs}
        setBlogs={setBlogs}
        setMessage={setMessage}
      />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  return (
    <div>
      <Notification message={message}/>
      {user === null
        ? login()
        : blog()
      }
    </div>
  )
}

export default App