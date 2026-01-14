describe('Exercicio - Testes End-to-end', () => {
    it('Deve fazer um pedido de ponta a ponta', () => {
        cy.visit('produtos/');

        // Seleção de produto estável
        cy.get('.product-block').first().click();
        cy.get('.button-variable-item-S').click();
        cy.get('.button-variable-item-Blue').click();
        cy.get('.single_add_to_cart_button').click();

        // Correção: Aguarda a mensagem de sucesso aparecer antes de buscar o botão
        // Isso evita o erro de "content: Ver carrinho but never did"
        cy.get('.woocommerce-message')
          .should('be.visible')
          .find('.button')
          .click();

        cy.get('.checkout-button').should('be.visible').click();

        // No Checkout
        // Marcar os termos e finalizar o pedido
        cy.get('#terms').click({ force: true });
        cy.get('#place_order').click({ force: true });

        // Validação final com timeout estendido para o Jenkins
        // O Jenkins pode demorar a processar o banco de dados do pedido
        cy.get('.woocommerce-notice', { timeout: 20000 })
          .should('be.visible')
          .and('contain', 'recebido');
    });
});
