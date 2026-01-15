// cypress/support/commands.js

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha)
    // Alterado de button para input para coincidir com o HTML real do site
    cy.get('input[name="login"]').click()
})
