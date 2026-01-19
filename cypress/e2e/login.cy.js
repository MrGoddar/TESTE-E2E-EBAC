describe('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Login com sucesso usando Comando customizado', () => {
        cy.login('aluno_ebac@teste.com', 'teste@teste.com')
        cy.get('.page-title', { timeout: 10000 }).should('contain', 'Minha conta')
    });
});
