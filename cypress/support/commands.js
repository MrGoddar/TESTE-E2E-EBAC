Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha)
    // Seletor alterado de .woocommerce-form-login__submit para input[name="login"]
    cy.get('input[name="login"]').click()
})
