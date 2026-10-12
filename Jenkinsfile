pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/DARKFLAME41/Jenkins'
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
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
        always {
            echo 'Pipeline Completed'
        }
    }
}
