import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogCreationFrom = ({blogs, setBlogs, setMessage}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  //!!the response from blog creation returns a blog object with the user field not populated
  const createBlog = async (event) => {
    event.preventDefault()
    const blog = {title, author, url}
    try {
      const data = await blogService.create(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`Blog ${data.title} by ${data.author} created`)
      setTimeout(() => setMessage(null), 5000)
      setBlogs(blogs.concat(data))
    } catch (e) {
      setMessage(`Error: ${e.response.data.error}`)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
        
      <div>
       author:
        <input
          type="text"
          name="Author"
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      
      <div>
      url:
        <input
          type="text"
          name="Url"
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">send</button>
    </form>
  )
}

export default BlogCreationFrom