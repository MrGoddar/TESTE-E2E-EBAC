pipeline {
    agent any

    environment {
        // Passo 6: Controle de Ambiente (Evita Hardcode)
        APP_URL = "http://lojaebac.ebaconline.art.br/"
    }

    stages {
        stage('Preparar Ambiente') {
            steps {
                // Passo 1: Organização e Instalação
                bat 'npm install'
            }
        }

        stage('Executar Testes') {
            steps {
                // Passo 3: Execução automática com reporte para JSON
                // O catchError permite seguir para o relatório mesmo se o teste falhar
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat "npx cypress run --env baseUrl=${APP_URL} --reporter mochawesome --reporter-options reportDir=cypress/reports,overwrite=false,html=false,json=true"
                }
            }
        }

        stage('Gerar Relatórios') {
            steps {
                // Passo 4: Geração do Mochawesome
                bat 'npm run report:merge'
                bat 'npm run report:gen'
            }
        }

        stage('Publicar Evidências') {
            steps {
                // Passo 5: Publicação local no Jenkins (Exibe no menu lateral)
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/reports/html',
                    reportFiles: 'report.html',
                    reportName: 'Relatorio Cypress'
                ])
                
                // Arquiva os arquivos para visualização histórica
                archiveArtifacts artifacts: 'cypress/reports/html/**', fingerprint: true
            }
        }
    }
}
