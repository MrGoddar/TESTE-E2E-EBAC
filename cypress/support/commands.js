Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').should('be.visible').type(usuario)
    cy.get('#password').should('be.visible').type(senha, { log: false })
    
    // Seletor mais específico para o botão de login do WooCommerce
    cy.get('.woocommerce-form-login__submit')
      .should('be.visible')
      .click({ force: true })
});
