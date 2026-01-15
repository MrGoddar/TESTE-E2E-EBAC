Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('minha-conta/')
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form-login__submit').click() // Seletor do botão de login da imagem
});
