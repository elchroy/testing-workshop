import React from 'react'
import {render} from 'react-dom'
import Login from '../login'

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // 🐨 create a fake object to hold the form field values (username and password)
  const testCreds = {
    username: 'test-username',
    password: 'test-password',
  }

  // 🐨 create a jest.fn() for your submit handler
  const testSubmitHandler = jest.fn(() => {})

  // 🐨 render the Login component to a div
  const container = document.createElement('div')
  render(<Login onSubmit={testSubmitHandler} />, container)

  // 🐨 get the field nodes
  // 💰 const inputs = div.querySelectorAll('input')
  // 💰 const form = div.querySelector('form')
  // 🐨 fill in the field values
  const form = container.querySelector('form')
  const {username, password} = form.elements
  username.value = testCreds.username
  password.value = testCreds.password

  // Act
  // 🐨 submit the form:
  // 💰 formNode.dispatchEvent(new window.Event('submit'))
  form.dispatchEvent(new window.Event('submit'))

  // Assert
  // 🐨 ensure your submit handler was called properly
  expect(testSubmitHandler).toBeCalledTimes(1)
  expect(testSubmitHandler).toBeCalledWith(testCreds)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-1&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
