import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: {Authorization: token}
  }
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const update = async (blog) => {
  const url = baseUrl.concat(blog.id)
  console.log(baseUrl)
  const config = {
    headers: {Authorization: token}
  }
  const res = await axios.put(url, blog, config)
  return res.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, create, update, setToken }