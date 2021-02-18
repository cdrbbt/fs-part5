/// <reference types="Cypress" />

describe('Note app', function() {

  const user = {
    name: 'Sam Jackson',
    username: 'sjack',
    password: 'ladle'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('login form is shown', function() {
    cy.get('#loginform')
  })

  describe('login', function() {

    it('user can log in', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginbutton').click()
      cy.contains(`Welcome ${user.name}`)
    })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type(user.username.concat('typo'))
      cy.get('#password').type(user.password)
      cy.get('#loginbutton').click()
      cy.contains('invalid username or password')
    })
  })

  describe('when logged in', function () {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: user.username, password: user.password
      }).then(res => {
        localStorage.setItem('user', JSON.stringify(res.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('can create a blog', function() {
      const blog = {
        title: 'cypress test',
        url: 'localhost',
        author: 'me'
      }

      cy.contains('new note').click()
      cy.get('#author').type(blog.author)
      cy.get('#title').type(blog.title)
      cy.get('#url').type(blog.url)

      cy.get('#sendblog').click()
      cy.contains(`Blog ${blog.title} by ${blog.author} created`)

      cy.get('#blogs').contains(blog.title)
    })
  })
})