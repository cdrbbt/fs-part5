import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogCreationFrom = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const blog = {title, author, url}
    try {
      blogService.create(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      console.log ('exceptop',e)
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