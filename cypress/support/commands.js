Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('minha-conta')
    
    // Espera explícita pelo campo para garantir que a página carregou
    cy.get('#username', { timeout: 10000 })
      .should('be.visible')
      .type(usuario, { log: false })
      
    cy.get('#password')
      .should('be.visible')
      .type(senha, { log: false })
    
    // Força o clique se houver algum overlay na frente (comum em CI)
    cy.get('button[name="login"]').click({ force: true })
})

Cypress.Commands.add('addProdutos', (produto, tamanho, cor, quantidade) => {
    cy.get('.product-block').contains(produto).click()
    
    // Garante que as opções de variação estão visíveis
    cy.get('.variable-item-tuple-' + tamanho).should('be.visible').click()
    cy.get('.variable-item-tuple-' + cor).should('be.visible').click()
    
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
    
    // Validação de que o produto realmente entrou no carrinho antes de sair da página
    cy.get('.woocommerce-message').should('contain', 'no seu carrinho')
})
