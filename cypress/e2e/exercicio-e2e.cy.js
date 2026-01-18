/// <reference types="cypress" />
describe('Exercicio - Testes End-to-end', () => {
  it('Deve fazer um pedido de ponta a ponta', () => {
    // Acessa a loja com timeout maior
    cy.visit('http://lojaebac.ebaconline.art.br/', { timeout: 30000 });
    
    // Aguarda qualquer container de produto aparecer (mais genérico)
    cy.get('.products, [class*="product"], .product, article, .grid', { timeout: 20000 })
      .should('be.visible');
    
    // Debug: captura screenshot e log da página atual
    cy.screenshot('debug-homepage');
    cy.document().then(doc => {
      cy.log('Título da página:', doc.title);
      cy.log('Número de elementos .product:', doc.querySelectorAll('.product').length);
      cy.log('Número de elementos article:', doc.querySelectorAll('article').length);
    });
    
    // Estratégia 1: Encontra QUALQUER botão de adicionar ao carrinho
    cy.get('button, [class*="add"], [class*="cart"], a[href*="cart"]', { timeout: 15000 })
      .first()
      .should('be.visible')
      .click({ force: true });
    
    // Verifica se carrinho foi atualizado
    cy.get('.cart-count, .cart-badge, [class*="cart-count"]', { timeout: 10000 })
      .should('have.text', '1')
      .or(cy.get('.cart').should('exist'));
    
    // Vai para checkout/carrinho
    cy.contains('Carrinho', { timeout: 10000 })
      .or(cy.contains('Checkout'))
      .or(cy.get('.cart-icon, [class*="cart-icon"]'))
      .click();
    
    // Preenche formulário de checkout com dados genéricos
    cy.get('input[type="email"], input[name*="email"], input[placeholder*="email"]', { timeout: 10000 })
      .type('teste@teste.com.br');
    
    cy.get('input[name*="name"], input[placeholder*="nome"], input[type="text"]:first', { timeout: 10000 })
      .type('João Teste');
    
    cy.get('input[name*="street"], input[placeholder*="rua"], textarea', { timeout: 10000 })
      .type('Rua das Flores 123');
    
    cy.get('input[name*="city"], input[placeholder*="cidade"], select', { timeout: 10000 })
      .type('São Paulo');
    
    cy.get('input[name*="postal"], input[placeholder*="cep"]', { timeout: 10000 })
      .type('01310-100');
    
    // Seleciona pagamento e confirma
    cy.contains(/pix|boleto|cartão/i, { timeout: 5000 }).click({ force: true });
    cy.contains(/confirmar|finalizar|comprar/i, { timeout: 10000 }).click();
    
    // Verifica sucesso (flexível)
    cy.contains(/sucesso|obrigado|confirmado/i, { timeout: 15000 })
      .should('be.visible');
  });
});
