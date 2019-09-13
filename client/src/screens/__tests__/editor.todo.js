import React from 'react'
import {render} from 'react-dom'
import Editor from '../editor'
import * as apiMock from '../../utils/api'

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve({created: true})),
    },
  }
})

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  // Arrange: create a fake user, post, history, and api
  const container = document.createElement('div')
  const testUser = {id: '123'}
  const testHistory = {
    push: jest.fn(),
  }

  // use ReactDOM.render() to render the editor to a div
  render(<Editor user={testUser} history={testHistory} />, container)

  // fill out form elements with your fake post
  const form = container.querySelector('form')
  const {title, content, tags} = form.elements
  title.value = 'Testing React apps'
  content.value =
    "Today I learnt how to test ReactJS applications, and I'm still learning."
  tags.value = 'this, is   ,a list,   of tags'

  // Act: submit form
  form.dispatchEvent(new window.Event('submit'))

  // wait for promise to settle
  await flushPromises()

  // Assert: ensure the create function was called with the right data
  expect(testHistory.push).toHaveBeenCalledTimes(1)
  expect(testHistory.push).toBeCalledWith('/')
  expect(apiMock.posts.create).toHaveBeenCalledTimes(1)
  expect(apiMock.posts.create).toBeCalledWith({
    authorId: testUser.id,
    content: content.value,
    title: title.value,
    tags: ['this', 'is', 'a list', 'of tags'],
    date: expect.any(String),
  })
})

// TODO later...
test('snapshot', () => {})
