// cypress/e2e/exercicio-e2e.cy.js

describe('Exercicio - Testes End-to-end', () => {
    it('Deve fazer um pedido de ponta a ponta', () => {
        // Visita a página de produtos
        cy.visit('produtos/');

        // Seleção de produto: Clica no primeiro produto da lista
        cy.get('.product-block').first().click();

        // Seleciona o Tamanho (S) e a Cor (Blue)
        // Adicionamos uma verificação de visibilidade para evitar o timeout do Jenkins
        cy.get('.button-variable-item-S').should('be.visible').click();
        cy.get('.button-variable-item-Blue').should('be.visible').click();
        
        // Adiciona ao carrinho
        cy.get('.single_add_to_cart_button').click();

        // Vai para o carrinho e depois para o checkout
        // Usando contains para ser mais resiliente a mudanças de classe
        cy.contains('Ver carrinho').click();
        cy.get('.checkout-button').should('be.visible').click();

        // No Checkout: Preenchimento e Finalização
        // O force: true ajuda caso existam overlays bloqueando o clique no Jenkins
        cy.get('#terms').click({ force: true });
        cy.get('#place_order').click({ force: true });

        // Validação final com timeout estendido para o Jenkins
        // Verifica se a mensagem de sucesso aparece
        cy.get('.woocommerce-notice', { timeout: 20000 })
            .should('be.visible')
            .and('contain', 'recebido');
    });
});
