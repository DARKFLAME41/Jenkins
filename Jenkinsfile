pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/pearlnaveen/sample1'
            }
        }

        stage('Compile') {
            steps {
                bat 'javac Addition.java'
            }
        }

        stage('Execute') {
            steps {
                bat 'java Addition'
            }
        }
    }

    post {
        success {
            echo 'Pipeline Execution SUCCESS!'
        }

        failure {
            echo 'Pipeline Execution FAILED!'
        }
        always{
            echo 'Pipeline Completed'
        }
    }
}