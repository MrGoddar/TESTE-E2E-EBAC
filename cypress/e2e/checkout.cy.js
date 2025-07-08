/// <reference types="cypress" />

describe('Funcionalidade: Checkout de produtos', () => {
    beforeEach(() => {
        cy.visit('produtos/')
    });
it('Deve adicionar produtos ao carrinho', () => {
    cy.get('.post-2559 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
    cy.get('.button-variable-item-S').click()
    cy.get('.button-variable-item-Red').click()
    cy.wait(5000)
    cy.get('.single_add_to_cart_button').click()
 
})


it('Deve adicionar produto 2 ao carrinho', () => {
    cy.visit('produtos/')
    cy.get('.post-3111 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
    cy.get('.button-variable-item-S').click()
    cy.get('.button-variable-item-Brown').click()
    cy.wait(5000)
    cy.get('.single_add_to_cart_button').click()
    
    
});

it('Deve acrescentar produto 3 ao carrinho', () => {
    cy.visit('produtos/')
    cy.get('.post-3073 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
    cy.get('.button-variable-item-32').click()
    cy.get('.button-variable-item-Blue').click()
    cy.wait(5000)
    cy.get('.single_add_to_cart_button').click()
});

it('Deve acrescentar ultimo produto ao carrinho', () => {
    cy.visit('produtos/')
    cy.get('.post-2622 > .product-block > .block-inner > .image > .product-image > .image-hover').click()
    cy.get('.button-variable-item-S').click()
    cy.get('.button-variable-item-Red').click()
    cy.get('.single_add_to_cart_button').click()
   
});

})