Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha)
    // Usamos force: true porque o Jenkins às vezes acha que algo está na frente do botão
    cy.get('.woocommerce-form-login__submit').click({ force: true }) 
})
