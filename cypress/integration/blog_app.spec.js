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
      cy.login(user.username, user.password)
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

    describe.only('when a blog exists', function() {
      const blog = {
        title: 'cypress ex',
        url: 'localhost',
        author: 'me'
      }
      beforeEach(function(){
        console.log(blog)
        cy.postBlog(blog)
      })

      it('the blog can be liked', function() {
        cy.visit('http://localhost:3000')
        cy.contains('details').click()
        cy.contains('Like').click()
        cy.contains('likes: 1')
      })

      it('the blog can be deleted', function() {
        cy.visit('http://localhost:3000')
        cy.contains('details').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', blog.title)
      })
    })
  })
})