describe('Exercicio - Testes End-to-end', () => {
    it('Deve fazer um pedido de ponta a ponta', () => {
        cy.visit('produtos')
        
        // Exemplo de fluxo: Selecionar produto, cor e tamanho
        cy.get('.product-block').first().click()
        cy.get('.variable-item-contents').first().click() // Cor
        cy.get('.variable-item-contents').last().click()  // Tamanho
        cy.get('.single_add_to_cart_button').click()

        // Correção do Timeout e Seletor da mensagem
        cy.get('.woocommerce-message', { timeout: 15000 })
          .should('be.visible')
          .and('contain', 'adicionado no seu carrinho');

        cy.get('.woocommerce-message > .button').click() // Ir para o carrinho
        cy.get('.checkout-button').click() // Checkout
        
        // Finalização do pedido
        cy.get('#terms').click({force: true})
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice', { timeout: 15000 })
          .should('contain', 'Obrigado. Seu pedido foi recebido.');
    });
});
