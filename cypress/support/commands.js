Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()

    cy.get('.page-title', { timeout: 15000 }).should('contain', 'Minha conta')
});
