Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()

    // Isso garante que o Cypress espere o painel carregar antes de seguir
    cy.get('.woocommerce-MyAccount-content', { timeout: 20000 }).should('be.visible')
});
