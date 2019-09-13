// using helpful utilities
import React from 'react'
// 🐨 you'll need these:
import {generate} from 'til-client-test-utils'
import {render, fireEvent} from 'react-testing-library'

// note that til-client-test-utils is found in `client/test/til-client-test-utils`
// note also that the client/test/setup-test-framework.js file takes care of
// `import react-testing-library/cleanup-after-each'` for us.
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // 🐨 use generate.loginForm() here instead of assigning fakeUser to an object
  // const fakeUser = {username: 'chucknorris', password: '(╯°□°）╯︵ ┻━┻'}
  const fakeUser = generate.loginForm()
  const handleSubmit = jest.fn()
  // 🐨 use: render(<Login onSubmit={handleSubmit} />)
  // It'll give you back an object with
  // `getByLabelText` and `getByText` functions
  // so you don't need a div anymore!
  // 💰 const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)
  const {container, getByLabelText, getByText} = render(
    <Login onSubmit={handleSubmit} />,
  )

  const usernameNode = getByLabelText('Username') // this is case-insensitive. so you can pass 'username' or just a regex
  const passwordNode = getByLabelText('Password') // same here
  const formNode = container.querySelector('form')
  const submitButtonNode = getByText('Submit') // this is still case-insensitive

  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  // Act: 🐨 Use fireEvent.click(submitButtonNode) instead of these two lines
  fireEvent.click(submitButtonNode)
  // you can also use fireEvent.submit(formNode)

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  // 🐨 this assertion is no longer necessary:
  expect(submitButtonNode.type).toBe('submit')
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-2%20(react-testing-library)&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
