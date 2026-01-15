Cypress.Commands.add('login', (usuario, senha) => {
    // Garante que está na página correta antes de tentar o login
    cy.visit('minha-conta') 
    
    cy.get('#username').type(usuario, { log: false })
    cy.get('#password').type(senha, { log: false })
    
    // Seletor ajustado para ser mais genérico caso o nome mude
    cy.get('button[name="login"]').should('be.visible').click()
})

Cypress.Commands.add('addProdutos', (produto, tamanho, cor, quantidade) => {
    cy.get('.product-block').contains(produto).click()
    cy.get('.variable-item-tuple-' + tamanho).click()
    cy.get('.variable-item-tuple-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
})
