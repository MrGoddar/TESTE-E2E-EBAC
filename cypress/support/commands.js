Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').should('be.visible').type(usuario);
    cy.get('#password').should('be.visible').type(senha, { log: false });
    
    // Forçamos o clique para evitar erros de "elemento sobreposto" no Jenkins
    cy.get('.woocommerce-form-login__submit')
        .should('be.visible')
        .click({ force: true });
});
