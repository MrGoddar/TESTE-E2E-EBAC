/// <reference types="cypress" />
describe('Exercicio - Testes End-to-end', () => {
  it('Deve fazer um pedido de ponta a ponta', () => {
    // Visita a loja e aguarda carregar completamente
    cy.visit('http://lojaebac.ebaconline.art.br/', { timeout: 20000 });
    cy.wait(2000); // Aguarda carregamento inicial
    
    // Aguarda a lista de produtos aparecer (mais robusto que texto específico)
    cy.get('div.product-block.grid', { timeout: 15000 }).should('be.visible');
    
    // Verifica se há pelo menos um produto disponível
    cy.get('div.product-block.grid .product-item').first().should('be.visible');
    
    // Alternativa 1: Pega o primeiro produto disponível (mais robusto)
    cy.get('div.product-block.grid .product-item').first().within(() => {
      cy.get('.product-name').invoke('text').then((productName) => {
        cy.log(`Produto encontrado: ${productName.trim()}`);
        
        // Clica no botão de adicionar ao carrinho
        cy.get('.add-to-cart-button').first().click({ force: true });
        cy.wait(1000);
      });
    });
    
    // Alternativa 2: Se quiser tentar produto específico com fallback
    /*
    cy.get('div.product-block.grid').within(() => {
      // Tenta encontrar o produto específico primeiro
      cy.contains('Abraxas Gym Pant', { timeout: 10000 }).then(($el) => {
        if ($el.length > 0) {
          cy.wrap($el).closest('.product-item').find('.add-to-cart-button').click();
        } else {
          // Fallback: usa primeiro produto disponível
          cy.get('.product-item').first().find('.add-to-cart-button').click();
        }
      });
    });
    */
    
    // Vai para o carrinho
    cy.get('.cart-icon, [data-testid="cart"], .minicart').click({ timeout: 10000 });
    cy.get('.cart-page, .checkout-page', { timeout: 10000 }).should('be.visible');
    
    // Preenche checkout (ajuste selectors conforme necessário)
    cy.get('input[name="email"], input[data-testid="email"]').type('teste@teste.com');
    cy.get('input[name="fullName"], input[data-testid="name"]').type('Teste User');
    
    // Preenche endereço
    cy.get('input[name="street"], input[data-testid="street"]').type('Rua Teste 123');
    cy.get('input[name="city"], input[data-testid="city"]').type('São Paulo');
    cy.get('input[name="postcode"], input[data-testid="postcode"]').type('01234-567');
    
    // Seleciona método de pagamento (ajuste selector)
    cy.contains('Pix, Credit Card', { timeout: 5000 }).click();
    
    // Confirma pedido
    cy.contains('Confirmar pedido', { timeout: 10000 }).click();
    
    // Verifica sucesso
    cy.contains('Pedido realizado com sucesso', { timeout: 10000 })
      .should('be.visible');
    
    cy.url().should('include', 'success');
  });
});
