Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha)
    // Seletor corrigido com base na imagem do console
    cy.get('input[name="login"]').click() 
})
