import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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


//Test will fail because the component tries to fetch data from local storage which isnt configured
test('Blog displays all data after button press', () => {
  const author = 'Admin'
  const title = 'testing react'
  const url = 'localhost'
  const likes = 5
  const user = { username: null }
  const blog = { author, url, likes, title, user }

  const component = render(
    <Blog blog={blog}/>
  )

  const button = component.container.querySelector('.visibilityToggle')
  fireEvent.click(button)

  //Checks that the details section is rendered
  expect(component.container.querySelector('.details')).not.toBe(null)

  //check to make sure the details are there
  expect(component.container).toHaveTextContent(url)
  expect(component.container).toHaveTextContent(likes)
})
