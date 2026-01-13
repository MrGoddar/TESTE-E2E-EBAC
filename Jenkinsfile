pipeline {
  agent any
  stages {
    stage('clonar repositorio') {
      steps {
        git branch: 'main', url: 'http://github.com/MrGoddar/TESTE-E2E-EBAC.git'
      }
    }
    stage('instalar dependencias')
    {
      steps {
        sh 'npm install'
      }
    }
    stage('Executar testes') {
      steps {
        sh 'npm run cy:run'
      }
    }
  }
}
