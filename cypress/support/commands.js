Cypress.Commands.add('login', (usuario, senha) => {
    // Garante que o campo de usuário esteja visível antes de digitar
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(usuario);
    cy.get('#password').should('be.visible').type(senha);
    
    // Tenta clicar no botão pelo nome da classe OU pelo atributo 'name'
    cy.get('button[name="login"]').click({ force: true });
});
