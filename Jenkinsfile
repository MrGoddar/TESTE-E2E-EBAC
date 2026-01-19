pipeline {
    agent any

    environment {
        // Passo 6: Controle de Ambiente
        APP_URL = "http://lojaebac.ebaconline.art.br/"
    }

    stages {
        stage('Preparar Ambiente') {
            steps {
                bat 'npm install'
            }
        }

        stage('Executar Testes') {
            steps {
                // O catchError permite que a pipeline chegue ao estágio de relatório mesmo com falhas nos testes
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
                // Passo 5: Publicação local via Artefatos (Solução para o erro de NoSuchMethodError)
                archiveArtifacts artifacts: 'cypress/reports/html/**', fingerprint: true
            }
        }
    }
}
