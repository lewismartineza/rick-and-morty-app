describe('Rick & Morty App', () => {
  it('render a list of 20 characters', () => {
    cy.visit('/')

    cy.get('.character-item').should('have.length', 20)
    cy.get('.character-item').first().should('contain', 'Rick Sanchez')
    cy.get('.character-item').first().should('contain', '🟢 Alive').and('contain', 'Human')
  })

  it('should navigate to the character detail page', () => {
    cy.visit('/')

    cy.get('.character-item').first().click()

    cy.url().should('include', '/1')
    cy.get('h1').should('contain', 'Rick Sanchez')
    cy.get('.episode').should('have.length', 51)
  })
})