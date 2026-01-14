Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('minha-conta')
    cy.get('#username').type(usuario, {force: true})
    cy.get('#password').type(senha, {log: false, force: true})
    cy.get('.woocommerce-form > .button').click({force: true})
});
