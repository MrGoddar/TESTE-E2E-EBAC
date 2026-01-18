/// <reference types="cypress" />
describe('Exercicio - Testes End-to-end', () => {
  it('Deve fazer um pedido de ponta a ponta', () => {
    // 1. Acessa a loja
    cy.visit('http://lojaebac.ebaconline.art.br/');
    
    // 2. Adiciona um produto ao carrinho
    cy.get('[data-cy="product-0"] button').click();
    cy.get('[data-cy="cart-item"]').should('be.visible');
    
    // 3. Vai para o checkout
    cy.get('[data-cy="cart"]').click();
    cy.get('[data-cy="checkout"]').click();
    
    // 4. Preenche dados de entrega
    cy.get('input[name="firstName"]').type('João');
    cy.get('input[name="lastName"]').type('Silva');
    cy.get('input[name="street"]').type('Rua das Flores, 123');
    cy.get('input[name="city"]').type('São Paulo');
    cy.get('input[name="postcode"]').type('01234-567');
    
    // 5. Seleciona método de entrega
    cy.get('[data-cy="delivery"]').select('Correios PAC');
    
    // 6. Preenche dados de pagamento
    cy.get('input[name="cardNumber"]').type('4111111111111111');
    cy.get('input[name="cardExpiry"]').type('12/26');
    cy.get('input[name="cardCvc"]').type('123');
    
    // 7. Completa o pedido
    cy.get('button[type="submit"]').click();
    
    // 8. Validações finais
    cy.contains('Pedido realizado com sucesso').should('be.visible');
    cy.url().should('include', '/success');
  });
});
