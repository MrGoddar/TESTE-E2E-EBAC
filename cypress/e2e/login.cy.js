describe('Funcionalidade Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta/');
    });

    it('Login com sucesso usando Comando customizado', () => {
        // Substitua pelos seus dados válidos
        cy.login('aluno_ebac@teste.com', 'teste@teste.com'); 
        
        // Verifica se o menu lateral de conta apareceu
        cy.get('.woocommerce-MyAccount-navigation').should('be.visible');
        
        // Verifica se o link de Sair existe (indica que logou)
        cy.contains('Sair').should('be.visible');
    });

    it('Login usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha);
        });
        cy.contains('Sair').should('be.visible');
    });
});
