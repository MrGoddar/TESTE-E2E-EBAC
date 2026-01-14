pipeline {
    agent any
    stages {
        stage('clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/MrGoddar/TESTE-E2E-EBAC.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                // Limpeza essencial para evitar erros de módulos no Windows
                bat 'if exist node_modules rd /s /q node_modules'
                bat 'npm install'
            }
        }
        stage('Executar testes E2E') {
            steps {
                // Rodando os testes contra a URL da Loja EBAC
                bat 'npm run ci:test'
            }
        }
    }
}
