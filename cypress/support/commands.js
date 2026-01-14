Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username', { timeout: 10000 }).should('be.visible').type(usuario);
    cy.get('#password').should('be.visible').type(senha);
    
    // Tenta pelo nome, se não achar, clica no botão que contém o texto "Login" ou "Acessar"
    cy.get('button').contains(/Log in|Login|Acessar/i).click({ force: true });
});
