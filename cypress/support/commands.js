// cypress/support/commands.js

Cypress.Commands.add('login', (usuario, senha) => {
    // Garante que o teste comece na página de login
    cy.visit('my-account/') 
    
    // Preenche os campos
    cy.get('#username').should('be.visible').type(usuario)
    cy.get('#password').should('be.visible').type(senha)
    
    // Clica no botão (mapeado como input conforme sua imagem)
    cy.get('input[name="login"]').click()
})
