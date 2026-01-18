/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end', () => {
    beforeEach(() => {
        cy.visit('produtos');
        cy.wait(2000); // Aguarda carregamento inicial
    });

    it('Deve fazer um pedido de ponta a ponta', () => {
        // 1. Adicionar produto (timeout maior + wait)
        cy.addProdutos('Abraxas Gym Pant', '32', 'Blue', 2, { timeout: 20000 });
        
        // 2. Ir para o carrinho
        cy.get('.woocommerce-message > .button', { timeout: 10000 })
            .should('be.visible')
            .click();

        // 3. Checkout - CORRIGIDO: checkout direto, sem login
        cy.get('a[href*="checkout"]', { timeout: 15000 })
            .or(cy.get('.checkout-button'))
            .or(cy.get('button.checkout'))
            .first()
            .should('be.visible')
            .click();

        // 4. Preencher Checkout (com waits e validações)
        cy.get('#billing_first_name', { timeout: 10000 }).type(faker.person.firstName());
        cy.get('#billing_last_name', { timeout: 10000 }).type(faker.person.lastName());
        cy.get('#billing_address_1', { timeout: 10000 }).type(faker.location.streetAddress());
        cy.get('#billing_city', { timeout: 10000 }).type(faker.location.city());
        cy.get('#billing_postcode', { timeout: 10000 }).type('01001-000');
        cy.get('#billing_phone', { timeout: 10000 }).type(faker.phone.number('###########'));
        cy.get('#billing_email', { timeout: 10000 }).type(faker.internet.email());

        // 5. Selecionar pagamento e finalizar
        cy.get('#payment_method_cod', { timeout: 10000 }).check({ force: true });
        cy.get('#terms', { timeout: 10000 }).check({ force: true });
        
        // Espera botão finalizar aparecer
        cy.get('#place_order', { timeout: 15000 })
            .should('be.visible', 'be.enabled')
            .click({ force: true });

        // 6. Validação final
        cy.get('.woocommerce-notice', { timeout: 20000 })
            .should('contain', 'Obrigado. Seu pedido foi recebido.');
    });
});
