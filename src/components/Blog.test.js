import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Blog from './Blog'

test('Blog displays only title and author by default', () => {
  const author = 'Admin'
  const title = 'testing react'
  const url = 'localhost'
  const likes = 5
  const blog = { author, url, likes, title }

  const component = render(
    <Blog blog={blog}/>
  )

  //Checks that the details section isnt rendered
  expect(component.container.querySelector('.details')).toBe(null)

  //double check to make sure the details arent there
  expect(component.container).not.toHaveTextContent(url)
  expect(component.container).not.toHaveTextContent(likes)

  //Check that blog title and author are in place
  expect(component.container).toHaveTextContent(author)
  expect(component.container).toHaveTextContent(title)

})
