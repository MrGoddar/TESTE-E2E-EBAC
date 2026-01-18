Cypress.Commands.add('login', (usuario, senha) => {
    // Espera explícita pelo campo para garantir que a página carregou
    cy.get('#username', { timeout: 15000 }).should('be.visible').type(usuario);
    cy.get('#password', { timeout: 15000 }).should('be.visible').type(senha, { log: false });
    
    // Seleciona o botão de login e usa force: true para evitar bloqueios de UI
    cy.get('.woocommerce-form-login__submit')
      .should('be.visible')
      .click({ force: true });
});
