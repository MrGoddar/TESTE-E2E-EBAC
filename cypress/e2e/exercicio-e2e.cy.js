describe('Exercicio - Testes End-to-end', () => {
    beforeEach(() => {
        cy.visit('produtos/') // Começa na loja
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // Adiciona um produto garantindo que ele existe
        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-S').click() // Tamanho S
        cy.get('.button-variable-item-Blue').click() // Cor Blue
        cy.get('.single_add_to_cart_button').click()

        // Vai para o carrinho e depois checkout para garantir o fluxo
        cy.get('.woocommerce-message > .button').click() // Botão "Ver Carrinho"
        cy.get('.checkout-button').click()

        // Preenche o campo de termos apenas se ele aparecer, usando force para evitar erros de sobreposição
        cy.get('#terms').click({force: true})
        cy.get('#place_order').click({force: true})

        // Espera a mensagem de sucesso
        cy.get('.woocommerce-notice', {timeout: 15000}).should('contain', 'recebido')
    });
});
