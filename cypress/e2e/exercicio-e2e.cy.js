/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

context('Funcionalidade: Adicionar múltiplos produtos ao carrinho', () => {
    const usuario = 'aluno_ebac@teste.com' 
    const senha = 'teste@teste.com'       

    beforeEach(() => {
        // Cria a sessão e valida se realmente logou
        cy.session('login-session', () => {
            cy.visit('minha-conta')
            cy.login(usuario, senha)
        }, {
            validate() {
                
                cy.get('.woocommerce-MyAccount-content', { timeout: 20000 }).should('be.visible')
            }
        })
    });

    it('Deve adicionar produtos ao carrinho e finalizar checkout', () => {
        cy.visit('produtos')
        
        // Exemplo de fluxo (ajuste os seletores conforme seus produtos)
        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()

        cy.get('.woocommerce-message').should('contain', 'adicionado no seu carrinho')
        
        cy.get('.dropdown-toggle > .mini-cart-items').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .total > .buttons > .checkout').click()

        // Preenchimento de Checkout (exemplo rápido)
        cy.get('#billing_first_name').clear().type(faker.person.firstName())
        cy.get('#billing_last_name').clear().type(faker.person.lastName())
        cy.get('#billing_address_1').clear().type(faker.location.streetAddress())
        cy.get('#billing_city').clear().type(faker.location.city())
        cy.get('#billing_postcode').clear().type('01001-000')
        cy.get('#billing_phone').clear().type(faker.phone.number())

        cy.get('#place_order').click({force: true})
        cy.get('.woocommerce-notice', { timeout: 15000 }).should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});
