import React, { useState } from 'react'

//Toggleable seems to actually work just fine?
//import Toggleable from './Toggleable'

const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visibility ? 'hide' : 'details'

  const changeVisibility = () => setVisibility(!visibility)

  const removeBlog = () => {
    const loggedInAs = JSON.parse(window.localStorage.getItem('user')).username
    if (blog.user.username !== loggedInAs) return null
    return (<button onClick={()=>deleteBlog(blog)}>delete</button>)
  }
  
  const like = () => {
    updateBlog(blog)
  }

  const details = () => {
    if (!visibility) return null
    return (
      <div>
        <p>{`author: ${blog.author}`}</p>
        <p>{`url: ${blog.url}`}</p>
        <p>{`likes: ${blog.likes}`} <button onClick={like}>Like</button></p> 
        {removeBlog()}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={changeVisibility}>{label}</button>
      {details()}
    </div>
  )}

export default Blog
