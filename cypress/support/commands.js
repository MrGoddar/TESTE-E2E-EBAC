Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('minha-conta/')
    
    // Força a espera pelo campo antes de digitar
    cy.get('#username', {timeout: 10000}).should('be.visible').type(usuario)
    cy.get('#password').should('be.visible').type(senha, {log: false})
    
    // Usa um seletor mais genérico para o botão de login se o específico falhar
    cy.get('button[name="login"]').click()
});
