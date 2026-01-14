Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario, { log: false });
    cy.get('#password').type(senha, { log: false });
    cy.get('.woocommerce-form-login__submit').click({ force: true });
});
