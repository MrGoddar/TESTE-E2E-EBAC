describe('Exercicio - Testes End-to-end', () => {
    
    beforeEach(() => {
        cy.visit('produtos/');
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Seleção do produto
        cy.get('.product-block').first().click();
        cy.get('.button-variable-item-S').click();
        cy.get('.button-variable-item-Blue').click();
        cy.get('.single_add_to_cart_button').click();

        // ESPERA CRÍTICA: Aguarda a mensagem de sucesso aparecer antes de ir para o carrinho
        // Aumentamos para 20s para garantir que o Jenkins processe a adição
        cy.get('.woocommerce-message', { timeout: 20000 })
            .should('be.visible')
            .find('.button')
            .click();

        // Ir para o Checkout
        cy.get('.checkout-button').should('be.visible').click();

        // Finalização no Checkout
        // O checkout do WooCommerce costuma ter muitos scripts, usamos force:true
        cy.get('#terms').click({ force: true });
        cy.get('#place_order').click({ force: true });

        // Validação Final
        cy.get('.woocommerce-notice', { timeout: 25000 })
            .should('be.visible')
            .and('contain', 'recebido');
    });
});
