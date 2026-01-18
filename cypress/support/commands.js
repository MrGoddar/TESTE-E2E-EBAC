// ***********************************************
// Este arquivo é usado para criar comandos customizados
// e substituir comandos existentes.
// ***********************************************

Cypress.Commands.add('login', (usuario, senha) => {
    // Garante que os campos fiquem visíveis antes de digitar
    cy.get('#username', { timeout: 10000 })
      .should('be.visible')
      .type(usuario);

    cy.get('#password', { timeout: 10000 })
      .should('be.visible')
      .type(senha, { log: false });

    // O seletor .woocommerce-form-login__submit é o oficial do tema da EBAC
    // Usamos {force: true} para evitar que overlays de "loading" bloqueiem o clique no Jenkins
    cy.get('.woocommerce-form-login__submit')
      .click({ force: true });
});

// Exemplo de comando para adicionar produto que você pode usar no exercicio-e2e
Cypress.Commands.add('addProdutos', (produto, tamanho, cor, quantidade) => {
    cy.get('.product-block').contains(produto).click();
    cy.get('.variable-item-' + tamanho).click();
    cy.get('.variable-item-' + cor).click();
    cy.get('.input-text').clear().type(quantidade);
    cy.get('.single_add_to_cart_button').click();
});
