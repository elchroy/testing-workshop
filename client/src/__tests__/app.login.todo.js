// add a beforeEach for cleaning up state and intitializing the API

import React from 'react'
import axiosMock from 'axios'
import {init as initAPI} from '../utils/api'
import App from '../app'
import {
  renderWithRouter,
  fireEvent,
  generate,
} from '../../test/til-client-test-utils'

let fakeUserCreds

beforeEach(() => {
  window.localStorage.removeItem('token') // clean up state
  axiosMock.__mock.reset()
  initAPI() // initialize the api
})

test('login as an existing user', async () => {
  // 🐨 render the app with the router provider and custom history
  // 💰 const utils = renderWithRouter(<App />)
  const utils = renderWithRouter(<App />)

  //
  // 🐨 wait for the app to finish loading the mocked requests
  // 💰 await utils.finishLoading()
  //
  await utils.finishLoading()

  // console.log(utils.container.innerHTML, 'regiserdusecreds')
  // 🐨 navigate to login by clicking login-link
  // 💰 the link has text that matches /login/i
  // 💰 when you fireEvent.click on the login link, react-router will ignore
  // the click unless it's a "left click" which is based on the `button`
  // property. So as a second argument to `fireEvent.click`, pass `{button: 0}`
  //
  fireEvent.click(utils.getByText('Login'), {button: 0})

  // 🐨 assert that window.location.href contains 'login'
  //
  expect(window.location.href).toContain('login')
  // 🐨 fill out the form
  fakeUserCreds = generate.loginForm()
  // 💰 generate.loginForm()
  // 💰 get the username and password fields and set their values
  utils.getByLabelText('Username').value = fakeUserCreds.username
  utils.getByLabelText('Password').value = fakeUserCreds.password

  //
  // Now we need to prepare our axios mock to handle the form submission properly:
  // use the axiosMock.__mock.instance
  const {post} = axiosMock.__mock.instance
  const token = generate.token()
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        user: {...fakeUserCreds, token},
      },
    }),
  )
  // to mock out the post implementation
  // it should return the fake user + a token
  // which you can generate with generate.token(fakeUser)
  // 💰 you may want to look at the final version for this one...
  //
  // 🐨 submit form by clicking on the submit button
  fireEvent.submit(utils.container.querySelector('form'))

  //
  // 🐨 wait for the mocked requests to finish
  // 💰 await utils.finishLoading()
  //
  await utils.finishLoading()

  // 🐨 now make some assertions:
  // assert post was called correctly
  // assert localStorage is correct
  // assert the user was redirected (window.location.href)
  // assert the username display is the fake user's username
  // assert the logout button exists

  console.log(utils.getByTestId('username-display').textContent, 'gegege')

  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledWith(
    '/auth/login',
    fakeUserCreds,
  )
  expect(window.localStorage.getItem('token')).toBe(token)
  expect(utils.getByTestId('username-display').textContent).toEqual(
    fakeUserCreds.username,
  )
  expect(window.location.href).not.toContain('login')
  expect(utils.getByText(/logout/i)).toBeTruthy()
  expect(window.location.href).toBe('https://til.test.com/')
  // expect(utils.getByText('Login')).not.toBeNull()
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=app.login&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
