/* globals cy */
describe('calculator', () => {
  it('can visit the app: default tests', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
  })

  it('can visit the app: modified test', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId('number-display')

    // expect(window.location.href).toEqual('hhihi') // this is not working yet!
  })
})
