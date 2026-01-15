Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('minha-conta')
    
    // Garante que o campo esteja pronto antes de digitar
    cy.get('#username').should('be.visible').type(usuario)
    cy.get('#password').should('be.visible').type(senha, { log: false })
    
    // Usa 'force: true' para garantir o clique no botão de login
    cy.get('button[name="login"]').click({force: true}) 
});
