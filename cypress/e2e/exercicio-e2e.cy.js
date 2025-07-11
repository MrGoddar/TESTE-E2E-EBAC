/// <reference types="cypress" />

describe('Funcionalidade: Adicionar múltiplos produtos ao carrinho', () => {


    const produtosParaAdicionar = [
        {
            nome: 'Abominable Hoodie',
            seletorProduto: '.post-2559',
            seletorTamanho: '.button-variable-item-S',
            seletorCor: '.button-variable-item-Red'
        },
        {
            nome: 'Aero Daily Fitness Tee',
            seletorProduto: '.post-3111',
            seletorTamanho: '.button-variable-item-S',
            seletorCor: '.button-variable-item-Brown'
        },
        {
            nome: 'Arcadio Denim Overall', 
            seletorProduto: '.post-3073',
            seletorTamanho: '.button-variable-item-32', 
            seletorCor: '.button-variable-item-Blue'
        },
        {
            nome: 'Atomic Endurance Tee', 
            seletorProduto: '.post-2622',
            seletorTamanho: '.button-variable-item-S',
            seletorCor: '.button-variable-item-Red'
        }
    ];
    before(() => {
        cy.session('carrinhoComQuatroProdutos', () => {
           
            cy.fixture('perfil').then(dados => {
                cy.visit('/minha-conta'); 
                cy.login(dados.usuario, dados.senha); 
                cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá, Aline');
            });
            produtosParaAdicionar.forEach(produto => {
                cy.visit('/produtos/'); 
                cy.get(produto.seletorProduto)
                  .find('.product-image') 
                  .click();

                cy.get(produto.seletorTamanho).click();
                cy.get(produto.seletorCor).click();
                cy.get('.single_add_to_cart_button').click();
             
            });

        }, {
            validate: () => {
                cy.visit('/carrinho/');
                cy.get('.woocommerce-cart-form__contents .cart_item').should('have.length', produtosParaAdicionar.length);
            }
        });
    });

    it('Deve adicionar todos os 4 produtos, verificar o carrinho e fazer o checkout', () => {
        cy.visit('/carrinho/');
        cy.get('.woocommerce-cart-form__contents .cart_item').should('have.length', produtosParaAdicionar.length);

        produtosParaAdicionar.forEach((produto, index) => {
            cy.get(`.cart_item:nth-child(${index + 1}) .product-name a`) 
        });

        cy.get('.checkout-button').should('be.visible');

        cy.get('.checkout-button').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
    });


});