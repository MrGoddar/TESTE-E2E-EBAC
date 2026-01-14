describe('Exercicio - Testes End-to-end', () => {
    it('Deve fazer um pedido de ponta a ponta', () => {
        cy.visit('produtos/');

        // Seleção de produto estável
        cy.get('.product-block').first().click();
        cy.get('.button-variable-item-S').click(); 
        cy.get('.button-variable-item-Blue').click(); 
        cy.get('.single_add_to_cart_button').click();

        // Em vez de classe CSS complexa, buscamos o texto do botão de ver carrinho
        cy.contains('Ver carrinho').click(); 
        cy.get('.checkout-button').click();

        // No Checkout
        cy.get('#terms').click({ force: true });
        cy.get('#place_order').click({ force: true });

        // Validação com timeout estendido para o Jenkins
        cy.get('.woocommerce-notice', { timeout: 20000 }).should('contain', 'recebido');
    });
});
