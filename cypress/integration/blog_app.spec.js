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
})